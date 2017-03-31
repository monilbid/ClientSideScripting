/**
 * @author Monil Bid
 * @description Create a Parallax Effect inside a div
 *              which changes on move of the cursor.
 */

"use strict";

function MakeParallaxFW(){
    var parallax = {};
    
    function $(element){
        return document.getElementById(element);
    }
    
    parallax.MakeParallax = function(params){
        if(!params){
            alert("You need to enter parameters to the function.");
            return;
        }
        
        if(!params.id){
            alert("You need to enter an ID for the div that you want the parallax effect in.");
            return;
        }
        
        var obj = $(params.id);
        
        if(!obj){
            alert("The div with ID '" + params.id + "' was not found.");
            return;
        }
        
        // Set the height of the div to the size of the screen
        obj.style.maxHeight = "100vh";
        obj.style.minHeight = "100vh";
        
        // Set the z-index of the container div to 0
        obj.style.zIndex = 0;
        
        // Get image URLs for each layer
        var backgroundUrl = params.backgroundUrl || "images/blue.png";
        var middlegroundUrl = params.middlegroundUrl || "images/sun.png";
        var foregroundUrl = params.foregroundUrl || "images/cloud.png";
        
        // Set a width for each layer's image
        var backgroundImgWidth = params.backgroundImgWidth || "99%";
        var middlegroundImgWidth = params.middlegroundImgWidth || "300px";
        var foregroundImgWidth = params.foregroundImgWidth || "400px";
        
        var backgroundDiv = $(params.backgroundDiv);
        if(!backgroundDiv){
            alert("You need to supply a div for the background");
            return;
        }
        
        // Set the left and top position of the background div
        var backgroundLeft = params.backgroundLeft || "0px";
        var backgroundTop = params.backgroundTop || "0px";
        backgroundDiv.style.left = backgroundLeft;
        backgroundDiv.style.top = backgroundTop;
        
        var middlegroundDiv = $(params.middlegroundDiv);
        if(!middlegroundDiv){
            alert("You need to supply a div for the middleground");
            return;
        }
        
        // Set the left and top position of the middleground div
        var middlegroundLeft = params.middlegroundLeft || "600px";
        var middlegroundTop = params.middlegroundTop || "100px";
        middlegroundDiv.style.position = "relative";
        middlegroundDiv.style.left = middlegroundLeft;
        middlegroundDiv.style.top = middlegroundTop;
        
        var foregroundDiv = $(params.foregroundDiv);
        if(!foregroundDiv){
            alert("You need to supply a div for the foreground");
            return;
        }
        
        // Set the left and top position of the foreground div
        var foregroundLeft = params.foregroundLeft || "700px";
        var foregroundTop = params.foregroundTop || "300px";
        foregroundDiv.style.position = "relative";
        foregroundDiv.style.left = foregroundLeft;
        foregroundDiv.style.top = foregroundTop;
        
        // Assign IDs to each image tag for each layer
        var bg_id = "backgroundImg";
        var mid_id = "middlegroundImg";
        var fore_id = "foregroundImg";

        // Display the layers
        display();
        
        // Get the left offset for each image
        var backgroundImgLeft = $(bg_id).offsetLeft;
        var middlegroundImgLeft = $(mid_id).offsetLeft;
        var foregroundImgLeft = $(fore_id).offsetLeft;
        
        
        /**
         * @returns Displays the three layers' images
         * */
        function display() {
            var bg_str = "<img id='" + bg_id + "' src='" + backgroundUrl + "' style='position: absolute; z-index: 1; width: " + backgroundImgWidth + "; max-height: 100%;'>";
            backgroundDiv.innerHTML = bg_str;
            
            var mid_str = "<img id='" + mid_id + "' src='" + middlegroundUrl + "' style='position: absolute; z-index: 2; width: " + middlegroundImgWidth + ";'>";
            middlegroundDiv.innerHTML = mid_str;
            
            var fore_str = "<img id='" + fore_id + "' src='" + foregroundUrl + "' style='position: absolute; z-index: 3; width:" + foregroundImgWidth + ";'>";
            foregroundDiv.innerHTML = fore_str;
        }
        
        var bg_speed = params.bg_speed || 5;
        var mid_speed = params.mid_speed || 20;
        var fore_speed = params.fore_speed || 60;
        
        /**
         * @function Checks for mouse movement on the screen
         * 
         * */
        obj.addEventListener("mousemove", function(event){
            event = event || window.event;
            var x = event.clientX - obj.offsetLeft;
            
            onMouseMove("backgroundImg", backgroundImgLeft, x, bg_speed); 
            onMouseMove("middlegroundImg", middlegroundImgLeft, x, mid_speed);
            onMouseMove("foregroundImg", foregroundImgLeft, x, fore_speed);
        });
        
        /**
         *           
         * @function Changes the horizontal position of each layer
         * 
         * @param id of the image
         * @param left position of the image
         * @param mouseX position (X axis position)
         * @param speed at which the image should move
         * */
        function onMouseMove(id, left, mouseX,  speed){
            var parallaxObj = $(id);
            var parentObj = parallaxObj.parentNode;
            var containerWidth = parseInt(parentObj.offsetWidth);
            
            parallaxObj.style.left = left - (((mouseX - (parseInt(parallaxObj.offsetWidth) / 2 + left)) / containerWidth) * speed) + "px";
            
        }
        
        /**
         * @function Set the background image
         * @param newImg URL of the new image
         * */
        obj.setBackgroundImage = function (newImg){
            backgroundUrl = newImg;
            display();
        };
        
        /**
         * @function Set the middleground image
         * @param newImg URL of the new image
         * */
        obj.setMiddlegroundImage = function (newImg){
            middlegroundUrl = newImg;
            display();
        };
        
        /**
         * @function Set the foreground image
         * @param newImg URL of the new image
         * */
        obj.setForegroundImage = function (newImg){
            foregroundUrl = newImg;
            display();
        };
        
        /**
         * @function Set the speed of motion of the background image
         * @param newSpeed The new speed at which the motion will occur
         * */
        obj.setBackgroundSpeed = function (newSpeed){
            bg_speed = Number(newSpeed);  
        };
        
         /**
         * @function Set the speed of motion of the middleground image
         * @param newSpeed The new speed at which the motion will occur
         * */
        obj.setMiddlegroundSpeed = function (newSpeed){
            mid_speed = Number(newSpeed);
        };
        
         /**
         * @function Set the speed of motion of the foreground image
         * @param newSpeed The new speed at which the motion will occur
         * */
        obj.setForegroundSpeed = function (newSpeed){
            fore_speed = newSpeed;
        };
        
        return obj;
    };
    
    return parallax;
}