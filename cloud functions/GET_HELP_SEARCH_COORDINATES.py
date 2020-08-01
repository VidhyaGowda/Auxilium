from pprint import pprint
from cloudant.client import Cloudant
from cloudant.adapters import Replay429Adapter
import requests
import math

def distance(origin, destination):
    lat1, lon1 = origin
    lat2, lon2 = destination
    radius = 6371  # km

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = radius * c

    return d

def main(dict):
    doc = dict
    
    client = Cloudant.iam("3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix",
                          "oxXUO9-AR5XOCXcQ9EJaVtIAY9DLPx77eUFCv2yrChqL", connect=True, adapter=Replay429Adapter(retries=10, initialBackoff=0.01))

    database_name = "auxilium"
    my_database = client[database_name]
    if my_database.exists():
        print('SUCCESS!!')
        
        slati = float(doc['latitude'])
        slongi = float(doc['longitude'])
        radius = 10000
        keyword = doc['keyword'].lower()
        
        URL = "https://3205c8bb-12e8-4e6b-b669-fbe872bf29df-bluemix.cloudant.com/auxilium/_design/geodd/_geo/newGeoIndex"
        PARAMS = (
            ('lat', slati),
            ('lon', slongi),
            ('radius', radius),
    
            ('limit', 20),
            ('relation', 'contains'),
            ('include_docs', 'true')
        )
        HEADERS = {
            'Content-Type': 'application/json'
        }
        
        r = requests.get(url=URL, params=PARAMS, headers=HEADERS)
        data = r.json()
        rows = data['rows']
        final = []
        result = []
        
        if len(rows) == 0:
            return {
                'message': 'no posts'
            }
        
        for row in rows:
            lati = float(row['doc']['geometry']['coordinates'][1])
            longi = float(row['doc']['geometry']['coordinates'][0])
            dist_btwn = distance((slati,  slongi),
                                 (lati, longi))
            row['doc'].update({
                'distance': dist_btwn
            })
            
        for row in rows:
            if row['doc']['user_id'] != doc['user_id']:
                final.append(row)
            else:
                pass
            
        if len(final) == 0:
            return {
                'message': 'no result'
            }

        for final in final:
            if keyword in final['doc']['content']['description']:
                result.append(final)
            else:
                pass
            
        if len(result) == 0:
            return {
                'message': 'no search results'
            }
            
        return {
            'data': result
        }
        
    else:
        pass
    
    