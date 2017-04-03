package model.Users;

public class StringData {
    // Select id, user_email, user_password, user_name, user_role from user_t
    public String id = "";
    public String user_email = "";
    public String user_password = "";
    public String user_name = "";
    public String user_role = "";
    
    public String errorMsg = ""; //If an error occurs, it will be stored here.

    public int getCharacterCount() {
        String s = this.id + this.user_email + this.user_password + this.user_name + this.user_role;
        return s.length();
    }
    
    @Override
    public String toString() {
        return "id:" + this.id
                + ", user_email:" + this.user_email
                + ", user_password:" + this.user_password
                + ", user_name:" + this.user_name
                + ", user_role:" + this.user_role;
    }
}