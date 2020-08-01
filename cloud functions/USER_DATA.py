import sys
import json
from pathlib import Path
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
from cloudant.query import Query, QueryResult
from cloudant.document import Document
from cloudant.design_document import DesignDocument


def main(dict):

    client = Cloudant.iam("3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix",
                          "oxXUO9-AR5XOCXcQ9EJaVtIAY9DLPx77eUFCv2yrChqL", connect=True)
    client.connect()

    database_name = "user"
    my_database = client.create_database(database_name)
    if my_database.exists:
        if dict['user_id'] in my_database:
            my_document = my_database[dict['user_id']]
            return {
                'data': my_document
            }
        else:
            my_document = my_database.create_document(dict['data'])
            if my_document.exists():
                return {
                    'data': my_document
                }
