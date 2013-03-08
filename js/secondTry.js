window.onload = init;
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
//=============================================================================== 
//===============================================================================    
var actionFields = ["field6","field7","field8","field9","field10","field11"];
forAll( actionFields, function( field ) {
    objectEventHandler(o(field), "mouseover", function() { highlight(field); } ); 
    objectEventHandler(o(field), "mouseout", function() { highlight(field); } );
    objectEventHandler(o(field), "click", function() { emailOrCall(field); } );     
});    
//-------------------------- select, deselect, call or email ------------
function highlight(id){
    if ( eventType() == "mouseover" ){
        o(id).select();
        o(id).style.cursor="pointer";
    }
    else if ( eventType() == "mouseout" ){
        deselect();
        o(id).style.cursor="default"; 
    }
}
//===============================================
function deselect(){
    try{
        if ( typeof document.selection.empty() == "function" ){  // IE
        document.selection.empty();
        }
    }
    catch(e) {window.getSelection().removeAllRanges();}  // Most Browsers
}
//===============================================
   function eventType() {
        if ( !e ) var e = window.event;
        return e.type;
    }
    //===============================================
function emailOrCall( id ){
    if( o(id) == o("field6") || o(id) == o("field7") ){
        sendEmail(id);
    }
    else{
        callNumber(id);
    }
}
//===============================================
function sendEmail(id){
    if ( confirm("OK to send email?") ){        
        document.location.href = "mailto:"+
        o('field2').value+
        " "+
        o('field1').value+
        " "+
        "<"+
        o(id).value.trim()+
        "> ?"+
        "cc="+o( ( id === "field6" ) ? "field7" : "field6" ).value;
    }
}
//==============================================
function callNumber(id){
    if ( o(id).value.trim() !== null && o(id).value.trim() !== "*" && o(id).value.trim() !== ""  ){
        if ( confirm("OK to Dial Number?")  ) {
            document.location.href = "tel:" + o(id).value.trim(); 
        }
    }    
}
//=================end of selec, deselect, call and email====================
//==============================================================================  
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


