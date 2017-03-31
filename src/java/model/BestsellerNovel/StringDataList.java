package model.BestsellerNovel;

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

            String sql = "SELECT id, title, image_url, author, isbn, year_published, price FROM bestseller_novels "
                    + " WHERE title LIKE ? ORDER BY title";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, countryNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.id = FormatUtils.formatInteger(results.getObject("id"));
                    sd.title = FormatUtils.formatString(results.getObject("title"));
                    sd.image_url = FormatUtils.formatString(results.getObject("image_url"));
                    sd.author = FormatUtils.formatString(results.getObject("author"));
                    sd.isbn = FormatUtils.formatString(results.getObject("isbn"));
                    sd.year_published = FormatUtils.formatInteger(results.getObject("year_published"));
                    sd.price = FormatUtils.formatDollar(results.getObject("price"));
                    
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.BestsellerNovel.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.CountryFlag.StringDataList Constructor: " + e.getMessage();
        }
    } // method

} // class
