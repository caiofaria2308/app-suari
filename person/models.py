from django.db import models

# Create your models here.


class PersonType(models.Model):
    name = models.CharField(max_length=32)


class PersonMediaType(models.Model):
    name = models.CharField(max_length=32)


class Person(models.Model):
    name = models.CharField(max_length=32, null=False)
    type = models.ForeignKey('PersonType')
    cpf = models.CharField(max_length=14, null=False)
    phone = models.CharField(max_length=15, null=True)
    company = models.CharField(max_length=32, null=False)
    last_update = models.DateTimeField(null=False)


class PersonMedia(models.Model):
    person_id = models.ForeignKey('Person', null=True)
    media_type = models.ForeignKey('PersonMediaType', null=False)
    object_media = models.TextField(null=False)


class PersonAudit(models.Model):
    person_id = models.ForeignKey('Person', null=False)
    type = models.IntegerField(null=False)
    cpf_new = models.CharField(max_length=14, null=False)
    cpf_old = models.CharField(max_length=14, null=True)
    last_update = models.DateTimeField(null=True)