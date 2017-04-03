package model.BestsellerNovel;

public class StringData {
    // Select id, title, image_url, author, isbn, year_published, and price from bestseller_novels.
    public String id = "";
    public String title = "";
    public String image_url = "";
    public String author = "";
    public String isbn = "";
    public String year_published = "";
    public String price = "";
    
    public String errorMsg = ""; //If an error occurs, it will be stored here.

    public int getCharacterCount() {
        String s = this.id + this.title + this.image_url + this.author + this.isbn + this.year_published + this.price;
        return s.length();
    }
    
    @Override
    public String toString() {
        return "id:" + this.id
                + ", title:" + this.title
                + ", image_url:" + this.image_url
                + ", author:" + this.author
                + ", isbn:" + this.isbn
                + ", year_published:" + this.year_published
                + ", price:" + this.price;
    }
}