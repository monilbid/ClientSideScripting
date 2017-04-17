<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Users.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData userErrors = new StringData();
    Gson gson = new Gson();
    DbConn dbc = new DbConn();
    userErrors.errorMsg = dbc.getErr();
    
    if(userErrors.errorMsg.length() == 0){
        String user_email = request.getParameter("user_email");
        String user_password = request.getParameter("user_password");
        
        if(user_email.length() == 0){
            userErrors.user_email = "Email is required.";
        }
        
        if(user_password.length() == 0){
            userErrors.user_password = "Password is required.";
        }
        
        System.out.println("JSP Page is going to search with user_email: " + user_email + "and user_password: " + user_password);
        
        StringData login_try = SearchUser.logon(user_email, user_password, dbc);
        
        if(login_try == null){
            userErrors.errorMsg = "Error finding user_email and user_password";
            session.invalidate();
        } else {
            userErrors.errorMsg = login_try.errorMsg;
            if(userErrors.getCharacterCount() == 0){
                session.setAttribute("user", login_try);
                session.setAttribute("login", "true");
            } else {
                userErrors.errorMsg = "An unexpected error occured. Please try again.";
            }            
        }
        System.out.println("logonAPI.jsp found these errors: " + userErrors.toString());
    }
    
    out.print(gson.toJson(userErrors).trim());
    dbc.close();
%>