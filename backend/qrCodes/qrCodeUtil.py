import string
import random
import qrcode


def generate_random_qr_string():
    # initializing size of string
    n = 20
    # using random.choices()
    # generating random strings
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=n))


def generate_qr_code_image(qr_string):
    return qrcode.make(qr_string)
