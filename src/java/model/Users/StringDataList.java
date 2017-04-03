package model.Users;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {
    public String dbError = "";
    private ArrayList<StringData> recordList = new ArrayList();

    // Default constructor just leaves the 2 data members initialized as above
    public StringDataList() {
    }

    // overloaded constructor populates the list (and possibly the dbError)
    public StringDataList(String countryNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for countries that start with " + countryNameStartsWith);

        try {

            String sql = "SELECT id, user_email, user_password, user_name, user_role FROM user_t"
                    + "  WHERE id LIKE ?  ORDER BY id";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, countryNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.id = FormatUtils.formatInteger(results.getObject("id"));
                    sd.user_email = FormatUtils.formatString(results.getObject("user_email"));
                    sd.user_password = FormatUtils.formatString(results.getObject("user_password"));
                    sd.user_name = FormatUtils.formatString(results.getObject("user_name"));
                    sd.user_role = FormatUtils.formatString(results.getObject("user_role"));
                    
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.Users.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.Users.StringDataList Constructor: " + e.getMessage();
        }
    } // method

} // class
