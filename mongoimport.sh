JSON_DIR="c:/swapi/json-data"
MONGO_URI="mongodb://localhost:27017/swapi"
 
 
for json_file in $JSON_DIR/*.json; do
 
    collection_name=$(basename "$json_file" .json)
 
    mongoimport --uri $MONGO_URI --collection $collection_name --drop --file $json_file --jsonArray
done
 
#chmod +x mongoimport.sh
#./mongoimport.sh