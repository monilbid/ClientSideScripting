<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Users.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    session.setAttribute("login", "false");
    session.invalidate();
%>
