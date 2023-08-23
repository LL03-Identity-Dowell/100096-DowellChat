from rest_framework import serializers

class CreateRoomServiceSerializer(serializers.Serializer):
    MODULE_CHOICES = (
        ('WORKFLOWAI', 'WORKFLOWAI'),
        ('TEAMMANAGEMENT', 'TEAMMANAGEMENT')
    )
    user_id = serializers.CharField(allow_null=False, allow_blank=False)
    workspace_id = serializers.CharField(allow_null=False, allow_blank=False)
    portfolio_name = serializers.CharField(allow_null=False, allow_blank=False)
    product_name = serializers.ChoiceField(allow_null=False, allow_blank=False, choices=MODULE_CHOICES)
    message = serializers.JSONField()