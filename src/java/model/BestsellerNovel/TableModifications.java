package model.BestsellerNovel;

import dbUtils.*;

public class TableModifications {

    public static StringData insert(StringData userData, DbConn dbc) {
        StringData errorMsgs = new StringData();

        System.out.println("In insert() - ready to insert user with these values: " + userData.toString());

        errorMsgs = validate(userData);
        System.out.println("In insert() - finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0) {
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else {
            System.out.println("In insert() passed validation");
        
            formMsg = dbc.getErr();
            if(formMsg.length() == 0){
                String sql = "INSERT INTO bestseller_novels(title, image_url, author, isbn, year_published, price) VALUES (?,?,?,?,?,?)";
                
                PrepStatement pStatement = new PrepStatement(dbc, sql);
                
                pStatement.setString(1, userData.title);
                if(userData.image_url.equals("")){
                    pStatement.setString(2, "");
                } else {
                    pStatement.setString(2, userData.image_url);
                }
                pStatement.setString(3, userData.author);
                pStatement.setString(4, userData.isbn);
                if(userData.year_published.equals("")){
                    pStatement.setString(5, "0");
                } else {
                    userData.year_published = userData.year_published.replaceAll(",", "");
                    pStatement.setString(5, userData.year_published);
                }
                if(userData.price.equals("")){
                    pStatement.setString(6, "0");
                } else {
                    userData.price = userData.price.substring(1, userData.price.length());
                    pStatement.setString(6, userData.price);
                }
                
                System.out.println("Ready to execute the insert");
                
                int numRows = pStatement.executeUpdate();
                
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error message from after executing the insert: " + formMsg);
                
                if(formMsg.length() == 0){
                    if(numRows == 1){
                        formMsg = "";
                    } else {
                        formMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            }
        }
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    }

    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        // Validation
        errorMsgs.title = ValidationUtils.stringValidationMsg(inputData.title, 200, true);
        if(!errorMsgs.image_url.equals("")){
            errorMsgs.image_url = ValidationUtils.stringValidationMsg(inputData.image_url, 200, true);
        }
        errorMsgs.author = ValidationUtils.stringValidationMsg(inputData.author, 200, true);
        errorMsgs.isbn = ValidationUtils.stringValidationMsg(inputData.isbn, 200, true);
        if(!errorMsgs.year_published.equals("")){
            errorMsgs.year_published = ValidationUtils.stringValidationMsg(inputData.year_published, 200, true);

        }
        if(!errorMsgs.price.equals("")){
            errorMsgs.price = ValidationUtils.stringValidationMsg(inputData.price, 200, true);
        }

        return errorMsgs;
    }
    
    public static StringData update(StringData userData, DbConn dbc){
        StringData errorMsgs = new StringData();
        
        System.out.println("In update()");
        System.out.println("Data obtained: " + userData.toString());
        
        if(userData.id == null){
            errorMsgs.errorMsg = "Error. ID should not be null";
            return errorMsgs;
        }
        
        if(userData.id.length() == 0){
            errorMsgs.errorMsg = "Error. ID should not be an empty String";
            return errorMsgs;
        }
        
        errorMsgs = validate(userData);
        
        
        String formMsg = "";
        
        if(errorMsgs.getCharacterCount() > 0){
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else {
            System.out.println("Successfully validated userData");
            
            formMsg = dbc.getErr();
            if(formMsg.length() == 0){
                String sql = "UPDATE bestseller_novels SET title=?, image_url=?, author=?, isbn=?, year_published=?, price=? WHERE id=?";
                
                PrepStatement statement = new PrepStatement(dbc, sql);
                
                statement.setString(1, userData.title);
                if(userData.image_url.equals("")){
                    statement.setString(2, "");
                } else {
                    statement.setString(2, userData.image_url);
                }
                statement.setString(3, userData.author);
                statement.setString(4, userData.isbn);
                if(userData.year_published.equals("")){
                    statement.setString(5, "0");
                } else {
                    userData.year_published = userData.year_published.replaceAll(",", "");
                    statement.setString(5, userData.year_published);
                }
                if(userData.price.equals("")){
                    statement.setString(6, "0");
                } else {
                    userData.price = userData.price.substring(1, userData.price.length());
                    statement.setString(6, userData.price);
                }
                statement.setString(7, userData.id);
                
                int numRows = statement.executeUpdate();
                
                formMsg = statement.getErrorMsg();
                System.out.println("Error Message after executing update: " + formMsg);
                
                if(formMsg.length() == 0){
                    if(numRows == 1){
                        formMsg = "";
                    } else {
                        formMsg = numRows + "records were updated when only 1 should have been.";
                    }
                }   
            }
        }
        errorMsgs.errorMsg = formMsg;
        
        return errorMsgs;
    }
    
    public static String deleteById(String id, DbConn dbc) {

        if (id == null) {
            return "Programmer error: for delete, Person Id should not be null.";
        }
        if (id.length() == 0) {
            return "Programmer error: for delete, Person Id should not be empty string.";
        }

        String formMsg = dbc.getErr(); // will be empty string if DB connection is OK.

        if (formMsg.length() == 0) { // db connection is good

            // prepare the statement 
            String sql = "DELETE FROM bestseller_novels WHERE id=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encoding string values into the prepared statement is pretty easy...
            pStatement.setString(1, id);

            // here the DELETE is actually executed (executeUpdate is used for any SQL other than SELECT, 
            // so that includes insert, update, and delete)
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            formMsg = pStatement.getErrorMsg();
            if (formMsg.length() == 0) {
                if (numRows == 1) {
                    formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    formMsg = numRows + " records were deleted (expected to delete 1).";
                }
            }
        } // Db Connection is good - double check, JSP page should not send us a bad one... 
        return formMsg;
    }
}
