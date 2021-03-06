from django.test import TestCase
from django import forms
from django.core.files.uploadedfile import SimpleUploadedFile

from ..forms import ImageForm

class ImageFormTest(TestCase):
    def test_form(self):
        upload_file = open('rekognition/tests/asset/test_celeb.jpg', 'rb')
        post_dict = {'title': 'Forms Test'}
        file_dict = {'input_image': SimpleUploadedFile(upload_file.name, upload_file.read(), content_type="image/jpeg" )}
        form = ImageForm(post_dict, file_dict)
        self.assertTrue(form.is_valid())
