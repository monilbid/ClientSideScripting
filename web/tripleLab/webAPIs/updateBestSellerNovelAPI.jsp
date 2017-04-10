<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="model.BestsellerNovel.*"%>

<%@page language="java" import="com.google.gson.*" %>

<%
    // This is the object we get from the GSON library.
    Gson gson = new Gson();

    // Create an empty StringData object to hold all the possible field level error messages.
    StringData errorMsgs = new StringData();

    // Extract from the URL, the json-ized version of record they want to update in the database. 
    String jsonUpdateData = request.getParameter("jsonData");

    // Will need a database connection object.
    DbConn dbc = new DbConn();

    if (jsonUpdateData == null) {
        errorMsgs.errorMsg = "Cannot update -- no data was received";
    } else {

        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok

            System.out.println("updateBestSellerNovel.jsp ready to update from this data: "
                    + jsonUpdateData);

            // Convert the json format (using the GSON object) to a POJO (plain old java object)
            StringData updateData = gson.fromJson(jsonUpdateData, StringData.class);

            // this method validates each field (putting any validation messages into 
            // errorMsgs (StringData object). 
            errorMsgs = TableModifications.update(updateData, dbc); // this is the form level message 
            
            System.out.println("personUpdate.jsp found these errors: "
                    + jsonUpdateData);
        } else{
            System.out.println("++++++++++++++++++++++++++++++++++++++++");
            System.out.println("updateBestSellerNovelAPI error: " + errorMsgs.errorMsg);
        }
    }
    out.print(gson.toJson(errorMsgs).trim());

    // prevent database connection leaks.
    dbc.close();
%>
