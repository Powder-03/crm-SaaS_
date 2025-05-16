from django.db import models
from django.contrib.auth.models import User
from team.models import Team

class Lead(models.Model):
    """
    Represents a lead in the CRM system.

    Attributes:
        NEW (str): Status indicating a new lead.
        CONTACTED (str): Status indicating the lead has been contacted.
        CONTACT_IN_PROGRESS (str): Status indicating contact with the lead is in progress.
        LOST (str): Status indicating the lead has been lost.
        WON (str): Status indicating the lead has been won.
        CHOICES_STATUS (list): A list of tuples representing the possible statuses for a lead.

        LOW (str): Priority level indicating low importance.
        MEDIUM (str): Priority level indicating medium importance.
        HIGH (str): Priority level indicating high importance.
        CHOICES_PRIORITY (list): A list of tuples representing the possible priority levels for a lead.

        team (ForeignKey): The team associated with the lead.
        company (str): The name of the company associated with the lead.
        contact_person (str): The name of the contact person for the lead.
        email (EmailField): The email address of the contact person.
        phone (str): The phone number of the contact person.
        website (str): The website of the company (optional).
        confidence (int): A confidence score for the lead (optional).
        estimated_value (int): The estimated value of the lead (optional).
        status (str): The current status of the lead, chosen from CHOICES_STATUS.
        priority (str): The priority level of the lead, chosen from CHOICES_PRIORITY.
        assigned_to (ForeignKey): The user to whom the lead is assigned (optional).
        created_by (ForeignKey): The user who created the lead.
        created_at (DateTimeField): The timestamp when the lead was created.
        modified_at (DateTimeField): The timestamp when the lead was last modified.
    """

    NEW = 'new'
    CONTACTED = 'contacted'
    CONTACT_IN_PROGRESS = 'inprogress'
    LOST = 'lost'
    WON = 'won'
    CHOICES_STATUS = [
        (NEW, 'New'),
        (CONTACTED, 'Contacted'),
        (CONTACT_IN_PROGRESS, 'In Progress'),
        (LOST, 'Lost'),
        (WON, 'Won'),
    ]
    
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    
    CHOICES_PRIORITY = [
        (LOW, 'Low'),
        (MEDIUM, 'Medium'),
        (HIGH, 'High'),
    ]
    
    team = models.ForeignKey(Team, related_name='leads', on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=255)
    website = models.CharField(max_length=255, blank=True, null=True)
    confidence = models.IntegerField(blank=True, null=True)
    estimated_value = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, choices=CHOICES_STATUS, default=NEW)
    priority = models.CharField(max_length=255, choices=CHOICES_PRIORITY, default=MEDIUM)
    assigned_to = models.ForeignKey(User, related_name='assignedleads', on_delete=models.SET_NULL, blank=True, null=True)
    created_by = models.ForeignKey(User, related_name='leads', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    
    
    
    
    
    
    
    
    
    

