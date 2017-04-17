package model.Users;

import dbUtils.*;
import java.sql.*;

public class SearchUser {
    public static StringData logon(String user_email, String user_password, DbConn dbc){
        StringData userErrors = new StringData();
        
        if(user_email == null || user_password == null){
            userErrors.errorMsg = "Email or Password was null. They can't be null";
            return userErrors;
        }
        
        try{
            String sql = "SELECT user_name, user_email, user_password FROM user_t WHERE user_email=? AND user_password=?";
        
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);
            
            pStatement.setString(1, user_email);
            pStatement.setString(2, user_password);
            
            ResultSet results = pStatement.executeQuery();
            
            if(results.next()){
                userErrors.user_email = user_email;
                userErrors.user_name = FormatUtils.formatString(results.getObject("user_name"));
                return userErrors;
            } else {
                return null;
            }
            
        } catch (Exception e){
            userErrors.errorMsg = "Exception while logging on: " + e.getMessage();
            System.out.println("*******" + userErrors.errorMsg);
        }
        
        return userErrors;
    }
}
