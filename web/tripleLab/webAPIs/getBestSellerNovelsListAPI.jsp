<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.BestsellerNovel.*" %>
<%@page language="java" import="java.util.ArrayList" %>

<%@page language="java" import="com.google.gson.*" %>

<%
    
    System.out.println("Before setting login to false");
    if(session.getAttribute("login") == null){
        System.out.println("Setting login to false");
        session.setAttribute("login", "false");
    }
    System.out.println("session attribute login = " + session.getAttribute("login"));
    System.out.println("After setting login to false");

    
    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection 

        String countryNameStartsWith = request.getParameter("q");
        if (countryNameStartsWith == null) {
            countryNameStartsWith = "";
        }

        // countryFlagList is an object with an array of country objects inside, 
        // plus a possible dbError.
        System.out.println("jsp page ready to search for country with " + countryNameStartsWith);
        list = new StringDataList(countryNameStartsWith, dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>
