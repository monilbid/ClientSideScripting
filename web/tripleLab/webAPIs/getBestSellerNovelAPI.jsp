<%-- 
    Document   : getBestSellerNovelsAPI
    Created on : Mar 31, 2017, 7:38:10 PM
    Author     : Monil
--%>

<%@page import="view.NovelView"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.BestsellerNovel.*" %>
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="view.NovelView"%>

<%

    Gson gson = new Gson();
    
    DbConn dbc = new DbConn();
    
    String id = request.getParameter("id");
    
    System.out.println("=====================================================");
    System.out.println("id = " + id);
    
    StringData book = NovelView.findBookById(dbc, id);
    
    out.print(gson.toJson(book).trim());

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.
%>