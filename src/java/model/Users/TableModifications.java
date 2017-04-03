package model.Users;

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
                String sql = "INSERT INTO user_t(user_email, user_password, user_name, user_role) VALUES (?,?,?,?)";
                
                PrepStatement pStatement = new PrepStatement(dbc, sql);
                
                pStatement.setString(1, userData.user_email);
                pStatement.setString(2, userData.user_password);
                pStatement.setString(3, userData.user_name);
                pStatement.setString(4, userData.user_role);
                
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
        errorMsgs.user_name = ValidationUtils.stringValidationMsg(inputData.user_name, 200, true);
        errorMsgs.user_email = ValidationUtils.stringValidationMsg(inputData.user_email, 200, true);
        errorMsgs.user_password = ValidationUtils.stringValidationMsg(inputData.user_password, 200, true);
        errorMsgs.user_role = ValidationUtils.stringValidationMsg(inputData.user_role, 200, true);

        return errorMsgs;
    }
}
