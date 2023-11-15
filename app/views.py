from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from .serializers import *
import pdb

from .helper import *
from .constant import *

from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
import uuid

from django.http import HttpResponse


@method_decorator(csrf_exempt, name='dispatch')
class health_check(APIView):
    def get(self, request ):
        return Response("if your are seeing this then , server is !down",status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class RoomService(APIView):
    def post(self, request):
        type_request = request.data.get('type')
        
        if type_request == "create_message":
            return self.create_message(request)
        elif type_request == "delete_room":
            return self.delete_room(request)
        else:
            return self.handle_error(request)
        
    def get(self, request):
        type_request = request.GET.get('type')

        if type_request == "get_room_by_id":
            return self.get_room_by_id(request)
        elif type_request == "get_messages":
            return self.get_messages(request)
        else:
            return self.handle_error(request)
        
    """CREATE ROOM SERVICE"""
    def create_room(self, user_id, org_id, product_name,portfolio_name, isLogin = False, public_QR=False):
        message = {"receiver":'How may I help you'}
        data = {
            "user_id": user_id,
            "org_id": org_id,
            "product_name": product_name,
            "portfolio_name": portfolio_name,
            "message": message,
        }

        serializer = CreateRoomServiceSerializer(data=data)
        if serializer.is_valid():
            room_name = generate_room_id(data["product_name"], user_id)
            field = {
                "eventId": get_event_id()["event_id"],
                "user_id": data["user_id"],
                "org_id": data["org_id"],
                "portfolio_name": data["portfolio_name"],
                # "room_id": room_name["room_name"],
                "product_name": data["product_name"],
                "message": data["message"],
                "isLogin": isLogin,
                "is_active": True,
            }
            response =  dowellconnection(*room_services, "insert", field, update_field=None)
            response = json.loads(response)
            if response["isSuccess"]:
                return {
                    "success": True,
                    "message": "Room created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": {**field,"room_id": response["inserted_id"],}
                }
            else:
                return{
                    "success": False,
                    "message": "Failed to create room ",
                }
        else:
            return Response({
                "success": False,
                "message": "Posting wrong data to API",
                "error": serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)

    
    """GET ROOM BY ID"""
    def get_room_by_id(self, request):
        room_id = request.GET.get('room_id')

        field = {
            "_id": room_id
        }

        print(room_id)
        response = json.loads(dowellconnection(*room_services, "find", field, update_field= None))
        return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response["data"],
        })
    
    """update message ROOM BY ID"""

    def create_message(self, request):
        type = request.data.get('type')
        room_id = request.data.get('room_id')
        message_data = request.data.get('message_data')
        side = request.data.get('side')
        author = request.data.get('author')
        message_type = request.data.get('message_type')
        data = {
            "type": type,
            "room_id": room_id,
            "message_data": message_data,
            "side": side,
            "author": author,
            "message_type": message_type,
        }
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            
            field = {
                "room_id": room_id,
                "message_data": message_data,
                "side": side,
                "author": author,
                "message_type": message_type,
                "read": True,
            }     
            response = json.loads(dowellconnection(*chat, "insert", field, update_field=None))
            return Response({
                "success": True,
                "message": "Message updated successfully",
                "response": response,
            })
        else:
            return Response({
                "success": False,
                "message": "Invalid data",
                "errors": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        
    """get message ROOM BY ID"""
    def get_messages(self, request):
        room_id = request.GET.get('room_id')
        field = {
            "room_id": room_id
        }
        response = json.loads(dowellconnection(*chat, "fetch", field, update_field= None))
        return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response,
        })

    
    
    """Delete message ROOM BY ID"""
    
    def delete_room(self,request,):
        room_id = request.data.get('room_id')
        message_data = request.data.get('is_active')
        field = {
            "_id": room_id,
        }
        update_field = {
            "is_active": message_data
        }       
        response = json.loads(dowellconnection(*room_services, "update", field, update_field= update_field))
        return Response({
            "success": True,
            "message": "Room deleted successfully",
            "response": response,
        })

    """HANDLE ERROR"""
    def handle_error(self, request): 
        return Response({
            "success": False,
            "message": "Invalid request type"
        }, status=status.HTTP_400_BAD_REQUEST)
    

class RoomController(RoomService):
    def post(self, request):
        user_id = request.data.get('user_id')
        org_id = request.data.get('org_id')
        product_name = request.data.get('product_name')
        portfolio_name = request.data.get('portfolio_name')
        response = self.roomFilter(user_id, org_id, product_name, portfolio_name)
        if response:
            return Response({
                "success": True,
                "message": "Room filter successfully",
                "inserted_id": response[0]["_id"],
                "response": response[0]
            })
        else:
            try:
                response = self.create_room(user_id, org_id, product_name, portfolio_name, isLogin = True)
                if response:
                    return Response({
                        "success": True,
                        "message": "Room created successfully",
                        "inserted_id": response["inserted_id"],
                        "response": response['response']
                    })
                
            except Exception as e:
                return Response({
                        "success": False,
                        "message": "Failed to create room",
                    })
    

    def roomFilter(self,user_id, org_id, product_name, portfolio_name):
        field = {
            "user_id": user_id,
            'org_id': org_id,
            'product_name': product_name,
            'portfolio_name': portfolio_name,
            'is_active': True
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None)) 
        return response["data"]


class RoomList(APIView):
    """GET ROOM BY SERVER SIDE""" 
    def get(self, request):
        org_id = request.GET.get('org_id')
        product_name= request.GET.get('product_name')


        field = {
            "org_id": org_id,
            "product_name": product_name
        }

        response_data = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None))
        if 'data' in response_data and len(response_data['data']) > 0:
            last_id = response_data['data'][-1]["_id"]
            last_room_response =  self.get_room_by_id(last_id)
            return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response_data["data"],
            "last_room_details": last_room_response["response"]
        })
        else:
            
            return Response({
            "success": False,
            "message": "Room not found on org_id",
        })
    def get_room_by_id(self, room_id):

        field = {
            "_id": room_id
        }

        print(room_id)
        response = json.loads(dowellconnection(*room_services, "find", field, update_field= None))
        return{
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response["data"],
        }

class createOpenChatRoom(RoomController):
    def post(self, request):
        user_id = request.data.get('user_id')
        product_name = request.data.get('product_name')
        org_id = generate_room_id(product_name, user_id)
        org_id = org_id['room_name']
        portfolio_name = user_id
        isLogin = False
        response = self.roomFilter(user_id, org_id, product_name, portfolio_name)
        if response:
            return Response({
                "success": True,
                "message": "Room filter successfully",
                "inserted_id": response[0]["_id"],
                "response": response[0]
            })
        else:
            response=self.create_room(user_id, org_id, product_name, portfolio_name, isLogin)
            if response:
                return Response({
                    "success": True,
                    "message": "Room created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": response['response']
                })
            else:
                return Response({
                    "success": False,
                    "message": "Failed to create room",
                })
        

@method_decorator(csrf_exempt, name='dispatch')
class QRServiceHandler(APIView):
    def get(self, request, *args, **kwargs):
        rooms = self.room_filter(workspace_id=kwargs['workspace_id'])
        print('rooms :', rooms)
        return Response({'rm_s': rooms})

    def save_links_2mgdb(self, company_id, links, job_name):
        url = "https://www.qrcodereviews.uxlivinglab.online/api/v3/qr-code/"
        
        payload = {
            "qrcode_type": "Link",
            "quantity": 1,
            "company_id": company_id,
            "links": [{'link': l} for l in links],
            "document_name":job_name
        }

        #   print(payload)
        response = requests.post(url, json=payload)
        #   print(response.text)
        return response

    def post(self, request, *args, **kwargs):
        workspace_id = str(request.data.get('workspace_id'))
        QR_ids = list(request.data.get('qr_ids'))
        pn = request.data.get('product_name')
        base_url = str(request.data.get('base_url'))
        product_name__key = str()
        # for i in QR_ids:
        #     print(i)
        try:
            product_name__key = [*pn][0]
            product_name_value = [*pn.value()][0]
            
            if not(product_name__key in product_details.keys() and product_name_value in product_details.values()):
                return Response({
                    'success': False,
                    'error' : 'Invalid Product Name.' 
                })
        except:
            pass    

        links = list()
        for qr_hash in QR_ids:
            rm_link = self.get_httpURL(base_url, qr_hash['qrid'], product_name__key, workspace_id, qr_hash['portfolioName'])
            links.append(rm_link)

        QR_server_response = self.save_links_2mgdb(workspace_id, links, product_name__key)  
        print(QR_server_response.text)
        QR_server_response=json.loads(QR_server_response.text)  
        if "qrcodes" in QR_server_response.keys():
            field = {
                'org_id': workspace_id,
                'QR_ids': QR_ids,
                'product_name': pn,
                'links': links,
            }
            response = json.loads(dowellconnection(*PublicChatIDReport, "insert", field, update_field= None))
            print(response)

        try:
            return Response({
                    'product_name':product_name__key, 
                    'qr_response': QR_server_response,
                })

        except:
            return HttpResponse(QR_server_response)

    def room_filter(self, workspace_id):
        field = {
            'workspace_id': workspace_id,
            'public_QR': True
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None)) 
        return response["data"]

    def get_httpURL(self, base_url, qr_id, event, workspace_id, portfolio_name):
        return f'{base_url.strip()}/init/chat/{workspace_id.strip()}/{event.strip()}/{qr_id.strip()}/{portfolio_name.strip()}/?public=true'
    
    
    


from django.http import JsonResponse
class QRServiceValidationHandler(QRServiceHandler, RoomService):
    def get(self,request, *args, **kwargs):
        room_create_response = self.create_room(kwargs['user_id'], kwargs['org_id'], kwargs['product_name'], portfolio_name=kwargs['user_id'], isLogin=False, public_QR=True)      #   print("ROOM :", room_create_response)
        try:
            return JsonResponse({'room': room_create_response})
        except:
            return room_create_response
        
    def post(self, request, *args, **kwargs):
        org_id = kwargs['org_id']
        
        try:
            field = {
                'org_id': org_id,
            }
            response = json.loads(dowellconnection(*PublicChatIDReport, "fetch", field, update_field=None))
            qr_id_list = []

            data = response.get('data', [])
            
            for item in data:
                qr_ids = item.get('QR_ids', []) 
                for qr_id in qr_ids:
                    qrid = qr_id.get('qrid')
                    if qrid:
                        qr_id_list.append(qrid)

            if qr_id_list:
                return JsonResponse({'qr_id_list': qr_id_list})
            else:
                return JsonResponse({"qr_id_list": qr_id_list})

        except json.JSONDecodeError as e:
            return JsonResponse({"status": f"JSON decoding error: {str(e)}"})
        except Exception as e:
            return JsonResponse({"status": f"An error occurred: {str(e)}"})




'''
    
        #   r_event = self.event_controller({ 'name' : event_name, 'workspace_id': workspace_id, 'room_count': len(QR_ids) })
        #   print("Event :", r_event)

    def create_event(self, event_name, room_count, workspace_id):
        data = {
            "workspace_id": workspace_id,
            "event_name": event_name,
            "room_count": room_count
        }

        serializer = CreateEventServiceSerializer(data=data)
        if serializer.is_valid():
            print("Event data parsed successfully")
            
            field = {
                "eventId": get_event_id()["event_id"],
                "workspace_id": data["workspace_id"],
                "event_name": data["event_name"],
                "room_count": data["room_count"],
                "is_active": True,
            }

            response =  dowellconnection(*event_services, "insert", field, update_field=None)
            print("response",response)
            if response["isSuccess"]:
                return {
                    "success": True,
                    "message": "Event created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": json.loads(response)
                }
            else:
                return{
                    "success": False,
                    "message": "Failed to create event",
                }
        else:
            return {
                "success": False,
                "message": "Posting wrong data to API",
                "error": serializer.errors
            }




    def get_event_by_details(self, event_name, workspace_id):
        field = {
            "event_name": event_name,
            'workspace_id': workspace_id,
        }

        response = json.loads(dowellconnection(*event_services, "fetch", field, update_field= None))
        return response["data"]

    def update_event_by_id(self, event_id, data):
        field = {
            "_id": event_id,
        }
        update_field = {
            **data
        }       
        response = json.loads(dowellconnection(*event_services, "update", field, update_field= update_field))
        return response


    def event_controller(self, event):
        ev_response = None
        ev = self.get_event_by_details(event['name'], event['workspace_id'])
        if ev['isSuccess']:
            field = {
                'room_count': ev['data']['room_count'] + event['room_count'],   #room_count += len(QR_ids)
            }
            ev_response = self.update_event(ev['data']['_id'], field)
        else:
            ev_response = self.create_event(event_name=event['name'], room_count=event['room_count'], workspace_id=['workspace_id'])      #   event = RoomEvent.objects.create(event_name=event_name, room_count=len(QR_ids), organization=company_id)        #   num_links = int(request.POST.get('your-surname'))
        return ev_response
'''

class PublicCreateRoom(RoomService):
    def get(self, request):
        try:
            api_key = request.query_params['api_key']

            authentication_res = processApiService(api_key)

            if authentication_res['success'] == False:
                return Response(authentication_res)
            
            room_id = request.GET.get('room_id')

            field = {
                "room_room_id": room_id
            }
            response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None))
            return Response({
                "success": True,
                "message": "Room deatils based on room_id",
                "response": response["data"],
            })
            
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
            user_id = str(uuid.uuid4()).replace("-",'')

            org_id = api_key.replace("-",'')
            product_name = "PUBLICCHAT"
            portfolio_name = f'{org_id}{product_name}'
            # response = self.roomFilter(user_id, org_id, product_name, portfolio_name)

            
            
            # if response:
            #     return Response({
            #         "success": True,
            #         "message": "Room filter successfully",
            #         "inserted_id": response[0]["_id"],
            #         "response": response[0]
            #     })
            # else:
            try:
                response = self.create_room(user_id, org_id, product_name, portfolio_name, isLogin = True)
                if response:
                    return Response({
                        "success": True,
                        "message": "Room created successfully",
                        "inserted_id": response["inserted_id"],
                        "response": response['response']
                    })
                
            except Exception as e:
                return Response({
                        "success": False,
                        "message": f"Failed to create room {str(e)}",
                    })
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
        
      
    def post(self, request):
        try:
            api_key = request.query_params['api_key']

            authentication_res = processApiService(api_key)

            if authentication_res['success'] == False:
                return Response(authentication_res)
            
            user_id = str(uuid.uuid4()).replace("-",'')

            org_id = request.data.get('org_id')
            product_name = request.data.get('product_name')
            portfolio_name = request.data.get('portfolio_name')
            response = self.roomFilter(user_id, org_id, product_name, portfolio_name)

            
            
            if response:
                return Response({
                    "success": True,
                    "message": "Room filter successfully",
                    "inserted_id": response[0]["_id"],
                    "response": response[0]
                })
            else:
                try:
                    response = self.create_room(user_id, org_id, product_name, portfolio_name, isLogin = True)
                    if response:
                        return Response({
                            "success": True,
                            "message": "Room created successfully",
                            "inserted_id": response["inserted_id"],
                            "response": response['response']
                        })
                    
                except Exception as e:
                    return Response({
                            "success": False,
                            "message": f"Failed to create room {str(e)}",
                        })
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
    

    def roomFilter(self,user_id, org_id, product_name, portfolio_name):
        field = {
            "user_id": user_id,
            'org_id': org_id,
            'product_name': product_name,
            'portfolio_name': portfolio_name,
            'is_active': True
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None)) 
        return response["data"]
    




class Enquiry(APIView):
    def get(self, request):
        try:
            user_id = request.query_params.get('user_id')
            book_id = request.query_params.get('book_id')

            query = ""

            if user_id and book_id:
                return Response({"message": "Please provide either 'user_id' or 'book_id'", "success": False}, status=HTTP_400_BAD_REQUEST)
            
            elif user_id:
                field = {
                    "user_id": user_id,
                }
                query="user_id"

            elif book_id:
                field = {
                    "book_id": book_id,
                }
                query="book_id"
            else:
                return Response({"message": "Please provide either 'user_id' or 'book_id'", "success": False}, status=HTTP_400_BAD_REQUEST)

            response = json.loads(dowellconnection(*sales_agent, "fetch", field, update_field= None))
            return Response({
                "success": True,
                "message": f"Enquiry details based on {query}",
                "response": response["data"],
            })
            
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        try:
            email = request.data.get('email')
            contact_type = request.data.get('contact_type')
            contact_name = request.data.get('contact_name')
            contact_email = request.data.get('contact_email')
            enquiry_details = request.data.get('enquiry_details')
            rating = request.data.get('rating')
            photo = request.data.get('photo')
            user_id = request.data.get('user_id')
            field = {
                "eventId": get_event_id()["event_id"],
                "book_id": str(uuid.uuid4()).replace("-",''),
                "user_id": user_id,
                "email": email,
                "contact_type": contact_type,
                "contact_name": contact_name,
                "contact_email": contact_email,
                "enquiry_details": enquiry_details,
                "rating": rating,
                "photo": photo,
            }
            response =  dowellconnection(*sales_agent, "insert", field, update_field=None)
            response = json.loads(response)
            if response["isSuccess"]:
                return Response(
                    {
                    "success": True,
                    "message": "Enquiry Data Saved Sucessfully",
                    "inserted_id": response["inserted_id"],
                    "response": {**field}
                }
                ) 
            else:
                return Response({
                    "success": False,
                    "message": "Failed to save booking ",
                })

        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)


class SaleAgentRefer(APIView):
    def get(self, request):
        try:
            email = request.query_params.get('email')
            referal_id = request.query_params.get('referal_id')
            print(email)
            query = ""

            if email and referal_id:
                return Response({"message": "Please provide either 'email' or 'book_id'", "success": False}, status=HTTP_400_BAD_REQUEST)
            
            elif email:
                field = {
                    "email": email,
                }
                query="email"

            elif referal_id:
                field = {
                    "referal_id": referal_id,
                }
                query="referal_id"
            else:
                return Response({"message": "Please provide either 'user_id' or 'book_id'", "success": False}, status=HTTP_400_BAD_REQUEST)

            response = json.loads(dowellconnection(*sales_agent_referal, "fetch", field, update_field= None))
            return Response({
                "success": True,
                "message": f"Enquiry details based on {query}",
                "response": response["data"],
            })
            
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        try:
            email = request.data.get('email')
            contact_name = request.data.get('contact_name')
            contact_Address = request.data.get('contact_Address')
            country = request.data.get('country')
            location = request.data.get('location')
            currency = request.data.get('currency')
            payment_reference = request.data.get('payment_reference')
            source_infor = request.data.get('source_infor')
            Prospective_client_name = request.data.get('Prospective_client_name')
            Brand_Prospective_client = request.data.get('Brand_Prospective_client')
            name_charge = request.data.get('name_charge')
            Designation_Prospective_client = request.data.get('name_charge')
            Website_Prospective_client = request.data.get('Website_Prospective_client')
            Email_Prospective_client = request.data.get('Email_Prospective_client')
            relationship_Prospective_client = request.data.get('relationship_Prospective_client')
            Location_Prospective_client = request.data.get('Location_Prospective_client')
            Country_Prospective_client = request.data.get('Country_Prospective_client')
            Address_Prospective_client = request.data.get('Address_Prospective_client')
            Phone_Prospective_client = request.data.get('Phone_Prospective_client')
            Products_Prospective_client = request.data.get('Products_Prospective_client')
            Linkedin_Prospective_client = request.data.get('Linkedin_Prospective_client')
            Twitter_Prospective_client = request.data.get('Twitter_Prospective_client')
            Facebook_Prospective_client = request.data.get('Facebook_Prospective_client')
            Instagram_Prospective_client = request.data.get('Instagram_Prospective_client')
            Youtube_Prospective_client = request.data.get('Youtube_Prospective_client')
            Tiktok_Prospective_client = request.data.get('Tiktok_Prospective_client')
            Description_Prospective_client = request.data.get('Tiktok_Prospective_client')
            Logo_Prospective_client = request.data.get('Tiktok_Prospective_client')
            suggestions_Prospective_client = request.data.get('suggestions_Prospective_client')




            field = {
                "eventId": get_event_id()["event_id"],
                "referal_id": str(uuid.uuid4()).replace("-",''),
                "email":email,
                "contact_name": contact_name,
                "contact_Address":contact_Address,
                "country": country,
                "location" :location,
                "currency" :currency,
                "payment_reference" : payment_reference,
                "source_infor" : source_infor,
                "Prospective_client_name": Prospective_client_name,
                "Brand_Prospective_client": Brand_Prospective_client,
                "name_charge" : name_charge,
                "Designation_Prospective_client":Designation_Prospective_client,
                "Website_Prospective_client":Website_Prospective_client, 
                "Email_Prospective_client":Email_Prospective_client, 
                "relationship_Prospective_client":relationship_Prospective_client,
                "Location_Prospective_client":Location_Prospective_client,
                "Country_Prospective_client":Country_Prospective_client,
                "Address_Prospective_client":Address_Prospective_client,
                "Phone_Prospective_client": Phone_Prospective_client,
                "Products_Prospective_client":Products_Prospective_client,
                "Linkedin_Prospective_client" : Linkedin_Prospective_client,
                "Twitter_Prospective_client" : Twitter_Prospective_client,
                "Facebook_Prospective_client" :Facebook_Prospective_client,
                "Instagram_Prospective_client":Instagram_Prospective_client,
                "Youtube_Prospective_client" :Youtube_Prospective_client,
                "Tiktok_Prospective_client":Tiktok_Prospective_client, 
                "Description_Prospective_client" :Description_Prospective_client,
                "Logo_Prospective_client":Logo_Prospective_client,
                "suggestions_Prospective_client":suggestions_Prospective_client,
            }
            response =  dowellconnection(*sales_agent_referal, "insert", field, update_field=None)
            response = json.loads(response)
            if response["isSuccess"]:
                return Response(
                    {
                    "success": True,
                    "message": "Referal Data Saved Sucessfully",
                    "inserted_id": response["inserted_id"],
                    "response": {**field}
                }
                ) 
            else:
                return Response({
                    "success": False,
                    "message": "Failed to save booking ",
                })

        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)

class AdminEnquiry(APIView):
    def get(self, request):
        try:
            client_admin_id = request.query_params.get('client_admin_id')
            
            if client_admin_id == "6390b313d77dc467630713f2":
                field = {}
                
            else:
                return Response({"message": "Authentication failed", "success": False}, status=HTTP_400_BAD_REQUEST)

            response = json.loads(dowellconnection(*sales_agent, "fetch", field, update_field= None))
            return Response({
                "success": True,
                "message": "All Enquiry details",
                "response": response["data"],
            })
            
        except Exception as e:
            return Response(
                {"message": str(e), "success": False}, status=HTTP_400_BAD_REQUEST)
        
    