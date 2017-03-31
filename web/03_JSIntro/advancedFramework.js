//Author: Monil Bid
//Date created: 02/07/2017
//Class: CIS 4350 - Client Side Scripting for the Web
//Instructor: Sally Kyvernitis
//File Name: index.html

"use strict";
function AdvancedFramework() {

    function get_id(element_id) {
        return document.getElementById(element_id);
    }

    var objectFW = {};
    objectFW.makeObject = function (params) {

        if (!params) {
            alert("Must provide an object as input parameter to MakeSlider()");
            return;
        }

        if (!params.id) {
            alert("Input parameter object to MakeSlider() must have an id property");
            return;
        }

        var newObj = get_id(params.id);

        if (!newObj) {
            alert("Error! The div ID passed does not exist.");
            return;
        }

        var backgroundColor = params.backgroundColor || "green";
        var objectWidth = params.width || 100;
        var objectHeight = params.height || 100;
        var borderRadius = params.borderRadius || 10;
        var objectMarginLeft = params.marginLeft || 100;
        var objectMarginTop = params.marginTop || 100;
        
        display();
        
        function display(){
            newObj.style.position = "absolute";
            newObj.style.width = objectWidth + "px";
            newObj.style.height = objectHeight + "px";
            newObj.style.backgroundColor = backgroundColor;
            newObj.style.borderRadius = borderRadius + "px";
            newObj.style.marginLeft = objectMarginLeft + "px";
            newObj.style.marginTop = objectMarginTop + "px";
            newObj.style.textAlign = "center";
        }
        
        // Public Methods
        
        // Set the background of the object to the specified color
        newObj.setBackgroundColor = function (newColor){
            backgroundColor = newColor;
            display();
        };
        
        // Set the width of the object to the specified width
        newObj.setObjectWidth = function (newWidth){
            objectWidth = Number(newWidth);
            display();
        };
        
        // Set the height of the object to the specified height
        newObj.setObjectHeight = function (newHeight){
            objectHeight = Number(newHeight);
            display();
        };
        
        // Set the border radius of the object to the specified radius
        newObj.setBorderRadius = function (newRadius){
            borderRadius = Number(newRadius);
            display();
        };
        
        newObj.setText = function (newText){
            newObj.innerHTML = newText;
            display();
        };

        return newObj;
    };

    return objectFW;
}