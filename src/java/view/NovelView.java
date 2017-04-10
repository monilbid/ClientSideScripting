package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;
import model.BestsellerNovel.*;

/**
 *
 * @author Monil
 */
public class NovelView {
    
    public static StringData extractBook(ResultSet result){
        StringData book = new StringData();
        
        try{
            book.id = FormatUtils.formatInteger(result.getObject("id"));
            book.title = FormatUtils.formatString(result.getObject("title"));
            book.image_url = FormatUtils.formatString(result.getObject("image_url"));
            book.author = FormatUtils.formatString(result.getObject("author"));
            book.isbn = FormatUtils.formatString(result.getObject("isbn"));
            book.year_published = FormatUtils.formatInteger(result.getObject("year_published"));
            book.price = FormatUtils.formatDollar(result.getObject("price"));
        } catch (Exception e) {
            book.errorMsg = "Data Exception thrown in NovelView.extractBook(): " + e.getMessage();
            System.out.println("******" + book.errorMsg);
        }
        
        return book;
    }
    
    public static StringDataList buildBookList(DbConn dbc){
        StringDataList bookList = new StringDataList();
        
        bookList.dbError = dbc.getErr();
        if(bookList.dbError.length() == 0){
            String sql = "SELECT * FROM bestseller_novels ORDER BY title";
            
            try{
                PreparedStatement statement = dbc.getConn().prepareStatement(sql);
                ResultSet result = statement.executeQuery();
                
                while(result.next()){
                    bookList.add(extractBook(result));
                }
            } catch (Exception e) {
                bookList.dbError = "SQL Exception Thrown in NovelView.buildBookList(): " + e.getMessage();
                System.out.println("******" + bookList.dbError);
            }
        }
        
        return bookList;
    }
    
    public static StringData findBookById(DbConn dbc, String id){
        StringData book = new StringData();
        
        if(id == null){
            book.errorMsg = "Cannot find person with null Id";
            return book;
        }
        
        book.errorMsg = dbc.getErr();
        if(book.errorMsg.length() == 0){
            String sql = "SELECT * FROM bestseller_novels WHERE id = ?";
            
            try{
                PreparedStatement statement = dbc.getConn().prepareStatement(sql);
                statement.setString(1, id);
                ResultSet result = statement.executeQuery();
                
                if(result.next()) {
                    book = extractBook(result);
                }
            } catch (Exception e){
                book.errorMsg = "SQL Exception thrown in NovelView.findBookById(): " + e.getMessage();
                System.out.println("*****" + book.errorMsg);
            }
        }
        
        return book;
    }
    
}
