var RNFS = require('react-native-fs');
import createGuid from "react-native-create-guid";
const FilePath = RNFS.DocumentDirectoryPath+ '/uuid.txt';

function CreateGuidFile(guid)
{
    RNFS.writeFile(FilePath,guid,'utf8').
    then((success) => {
        console.log('File Created')
    }).
    catch((err)=>{
        console.log(err.message);
    })
}

function GetGuidFromFile()
{
    var guid = RNFS.readFile(FilePath)
    .then((content) => {
        console.log(content);
        return content;
    }).catch(err=>{
        console.log(err.message);
        return "FileNotFound";
    });
    return guid;
}

async function GetGuid()
{
    console.log("Get guid from:",FilePath);
    var guid = RNFS.exists(FilePath).
    then((fileIsExist) => {
        console.log(fileIsExist);
        if(fileIsExist)
        {
            console.log("The file is exsit, get the guid:");
            return GetGuidFromFile();
        }
        else{
            console.log("The file isn't exsit, go to create the file with a new guid:");
            createGuid().then(
                (guid) => {
                    console.log("A new guid generated for this phoneNumber:" ,guid);
                    CreateGuidFile(guid);
                    return guid;
                });
        }
    })
    return guid;
}

module.exports= {GetGuid};