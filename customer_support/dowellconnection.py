import json
import requests
def dowellconnection(cluster, database, collection, document, team_member_ID, function_ID, command, room):
    url = "http://100002.pythonanywhere.com/"
    payload = {
        "cluster": cluster,
        "database": database,
        "collection": collection,
        "document": document,
        "team_member_ID": team_member_ID,
        "function_ID": function_ID,
        "command": command,
        **room,
        "platform": "bangalore"
    }
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, json=payload)
    res= json.loads(response.text)


    return res
