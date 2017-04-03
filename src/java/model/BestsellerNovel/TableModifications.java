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
                pStatement.setString(2, userData.image_url);
                pStatement.setString(3, userData.author);
                pStatement.setString(4, userData.isbn);
                pStatement.setString(5, userData.year_published);
                pStatement.setString(6, userData.price);
                
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
        errorMsgs.image_url = ValidationUtils.stringValidationMsg(inputData.image_url, 200, true);
        errorMsgs.author = ValidationUtils.stringValidationMsg(inputData.author, 200, true);
        errorMsgs.isbn = ValidationUtils.stringValidationMsg(inputData.isbn, 200, true);
        errorMsgs.year_published = ValidationUtils.stringValidationMsg(inputData.year_published, 200, true);
        errorMsgs.price = ValidationUtils.stringValidationMsg(inputData.price, 200, true);

        return errorMsgs;
    }
}
