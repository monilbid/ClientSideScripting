<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Users.*" %>
<%@page language="java" import="java.util.ArrayList" %>

<%@page language="java" import="com.google.gson.*" %>

<%
    StringDataList list = new StringDataList();
    
    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr();
    
    if(list.dbError.length() == 0){
        String userNameStartsWith = request.getParameter("q");
        if(userNameStartsWith == null){
            userNameStartsWith = "";
        }
        
        System.out.println("jsp page is ready to search for user with " + userNameStartsWith);
        list = new StringDataList(userNameStartsWith, dbc);
    }
    
    dbc.close();
    
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>