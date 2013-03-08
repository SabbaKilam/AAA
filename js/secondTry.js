window.onload = init;//  o.addEventListener(e,h);
//objectEventHandler( window, "load", init);
//==============DATA=======================
    var ajax = new HttpObject()
    , records = []
    , recordCount = 0
    , recordPointer = 1
    , greenLight = true
    , stepping = false
    , delay = 100
    , matchIndexes = []
    , indexPointer = 0
    , matchCount = 0
    , currentMatch = ""
    ;
//===============================================
function init(){
    o("match").focus();
    ajax.open("GET", "https://dl.dropbox.com/u/21142484/AAA/docs/ComputerStudents.csv", true );
    ajax.onreadystatechange = function() {
            if ( ajax.readyState == 4 ){
                if ( ajax.status == 200 || ajax.status == 0 ){ //  || ajax.status == 0  
                    records = ajax.responseText.split("\n");
                    recordCount = records.length;
                    o("c").innerHTML = ""+recordPointer;
                    o("m").innerHTML = ""+(recordCount - 1);
                    nowShowRecord();
                }
                else { 
                    if ( confirm("Trouble getting Data remotely.\r\rClick OK to try again.") ) init();
                }            
            }
    };
    ajax.send();
}
//------------------------------------------------
function nowShowRecord(){
    try{
        var record = records[recordPointer].split(",");
    }
    catch(err){
        //return; //in case records[recordPointer] is undefined and can't split()
    }
    try{
        o("field0").value = record[0];
    }
    catch(err){}
    for( var i = 1; i< record.length; i++ ) {
        try{    
            o("field"+i.toString()).value = " " + record[i];
        }
        catch(err){}
    }
    try{
        o("c").innerHTML = recordPointer;
        if( matchCount != 0 ){
            o('matchIndex').innerHTML = indexPointer +1;
            o('sp').innerHTML = singularPlural("match", matchCount);
        }
    }
    catch(err){}
}
//===============================================  
//init();  
//===============================================
