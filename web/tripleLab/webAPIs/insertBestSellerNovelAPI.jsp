<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.BestsellerNovel.*" %>

<%@page language="java" import="com.google.gson.*" %>

<%

    Gson gson = new Gson();
    
    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();
    
    String jsonInsertData = request.getParameter("jsonData");
    if(jsonInsertData == null){
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else if(session.getAttribute("login") != null){
        if(session.getAttribute("login").equals("false")){
            errorMsgs.errorMsg = "User not logged in";
        }
    }else {
        System.out.println("jsonInsertData is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if(errorMsgs.errorMsg.length() == 0){
            System.out.println("insertBestSellerNovelAPI.jsp ready to insert");
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);
            errorMsgs = TableModifications.insert(insertData, dbc);
        }
    }
    
    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>