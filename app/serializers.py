from rest_framework import serializers

class CreateRoomServiceSerializer(serializers.Serializer):
    MODULE_CHOICES =(
    ("WORKFLOWAI","WORKFLOWAI"),
    ("TEAMMANAGEMENT","TEAMMANAGEMENT"),
    ("WIFIQRCODE","WIFIQRCODE"),
    ('SALESAGENTLOGIN','SALESAGENTLOGIN'),
    ('LEGALZARD','LEGALZARD'),
    ('USEREXPERIENCELIVE','USEREXPERIENCELIVE'),
    ('SOCIALMEDIAAUTOMATION','SOCIALMEDIAAUTOMATION'),
    ('LIVINGLABCALCULATOR','LIVINGLABCALCULATOR'),
    ('LIVINGLABSCALES','LIVINGLABSCALES'),
    ('LOGOSCAN','LOGOSCAN'),
    ('LIVINGLABMONITORING','LIVINGLABMONITORING'),
    ('PERMUTATIONCALCULATOR','PERMUTATIONCALCULATOR'),
    ) 
    user_id = serializers.CharField(allow_null=False, allow_blank=False)
    workspace_id = serializers.CharField(allow_null=False, allow_blank=False)
    portfolio_name = serializers.CharField(allow_null=False, allow_blank=False)
    product_name = serializers.ChoiceField(allow_null=False, allow_blank=False, choices=MODULE_CHOICES)
    message = serializers.JSONField()




class CreateEventServiceSerializer(serializers.Serializer):
    workspace_id = serializers.CharField(allow_null=False, allow_blank=False)
    event_name = serializers.CharField(allow_null=False, allow_blank=False)
    room_count = serializers.DecimalField(max_digits=19, decimal_places=10)