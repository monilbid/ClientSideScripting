<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="model.BestsellerNovel.*"%> 
<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    // This is the object we get from the GSON library.
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    String deleteId = request.getParameter("id");
    System.out.println("ready to delete book "+deleteId);
    
    // just so we have an actual pojo (plain old java object)
    // to convert to json. 
    StringData book = new StringData();
    
    book.errorMsg = "";
    
    if (deleteId == null) {
        book.errorMsg = "Cannot delete -- no id was received";
    } else if (session.getAttribute("login") != null){
        if(session.getAttribute("login").equals("false")){
            book.errorMsg = "User not Logged In"; 
        }  else {
            book.errorMsg = dbc.getErr();
            if (book.errorMsg.length() == 0) { // means db connection is ok
                //System.out.println("personDelete.jsp ready to delete id "+deleteId);
                book.errorMsg = TableModifications.deleteById(deleteId, dbc);
            }
        }
    }
    System.out.println("result of that delete is: "+book.errorMsg+"(empty string means worked)");
    out.print(gson.toJson(book));
    dbc.close();
%>