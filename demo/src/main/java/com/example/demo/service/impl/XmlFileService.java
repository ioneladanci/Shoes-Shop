package com.example.demo.service.impl;

import com.example.demo.Dto.CartDto;
import com.example.demo.Dto.CartItemDto;
import com.example.demo.Dto.ProductDto;
import com.example.demo.Dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.WishListRepo;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;
import com.example.demo.service.WishListService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class XmlFileService {
    @Autowired
    UserService userService;

    @Autowired
    CartService cartService;
    @Autowired
    WishListService wishListService;
    @Autowired
    EmailServiceImplementare emailServiceImplementare;

    public static final String xmlFilePath = "C:\\Users\\Admin\\demo\\demo\\xmlReport.xml";

    public  String CreateXMLFile(String email,String reportType){
        try {

            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();

            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();

            Document document = documentBuilder.newDocument();

            // root element
            Element root = document.createElement(reportType);
            document.appendChild(root);

            List<UserResponse> userList=userService.findAll();
            // user element


            // set an attribute to staff element
            if(reportType.equals("wishlist")){
                for(UserResponse userResponse:userList){
                    Element user = document.createElement("user");
                    root.appendChild(user);
                    Attr attr = document.createAttribute("email");
                    attr.setValue(userResponse.getEmail());


                    user.setAttributeNode(attr);
                    List<ProductDto> wishList=wishListService.getWishList(userResponse.getEmail());


                    for(ProductDto productDto:wishList){
                        Element product = document.createElement("product");
                        user.appendChild(product);

                        Attr id = document.createAttribute("id");
                        id.setValue(productDto.getId().toString());
                        product.setAttributeNode(id);

                        Element name = document.createElement("name");
                        name.appendChild(document.createTextNode(productDto.getName()));
                        product.appendChild(name);

                        Element sex = document.createElement("sex");
                        sex.appendChild(document.createTextNode(productDto.getSex()));
                        product.appendChild(sex);

                        Element category = document.createElement("category");
                        category.appendChild(document.createTextNode(productDto.getCategory().name()));
                        product.appendChild(category);

                        Element brand = document.createElement("brand");
                        brand.appendChild(document.createTextNode(productDto.getBrand()));
                        product.appendChild(brand);

                        Element price = document.createElement("price");
                        price.appendChild(document.createTextNode(productDto.getPrice().toString()));
                        product.appendChild(price);


                    }
                }
            }

            else if(reportType.equals("cart")){
                for(UserResponse userResponse:userList){
                    Element user = document.createElement("user");
                    root.appendChild(user);
                    Attr attr = document.createAttribute("email");
                    attr.setValue(userResponse.getEmail());
                    user.setAttributeNode(attr);
                    CartDto cart=cartService.listCartItems(userResponse.getEmail());
                    Attr cartAttr = document.createAttribute("priceOfCart");
                    cartAttr.setValue(String.valueOf(cart.getTotalCost()));
                    user.setAttributeNode(cartAttr);
                    for(CartItemDto cartItemDto:cart.getCartItems()){
                        Element product = document.createElement("product");
                        user.appendChild(product);

                        Attr id = document.createAttribute("id");
                        id.setValue(cartItemDto.getProduct().getId().toString());
                        product.setAttributeNode(id);
                        Attr quantity = document.createAttribute("quantity");
                        quantity.setValue(String.valueOf(cartItemDto.getQuantity()));
                        product.setAttributeNode(quantity);
                        Element name = document.createElement("name");
                        name.appendChild(document.createTextNode(cartItemDto.getProduct().getName()));
                        product.appendChild(name);

                        Element sex = document.createElement("sex");
                        sex.appendChild(document.createTextNode(cartItemDto.getProduct().getSex()));
                        product.appendChild(sex);

                        Element category = document.createElement("category");
                        category.appendChild(document.createTextNode(cartItemDto.getProduct().getCategory().name()));
                        product.appendChild(category);

                        Element brand = document.createElement("brand");
                        brand.appendChild(document.createTextNode(cartItemDto.getProduct().getBrand()));
                        product.appendChild(brand);

                        Element price = document.createElement("price");
                        price.appendChild(document.createTextNode(cartItemDto.getProduct().getPrice().toString()));
                        product.appendChild(price);
                    }
                }
            }

            // create the xml file
            //transform the DOM Object to an XML File
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            DOMSource domSource = new DOMSource(document);
            StreamResult streamResult = new StreamResult(new File(xmlFilePath));

            // If you use
            //StreamResult result = new StreamResult(System.out);
            // the output will be pushed to the standard output ...
            // You can use that for debugging

            transformer.transform(domSource, streamResult);

            System.out.println("Done creating XML File");
            emailServiceImplementare.sendEmailWithXMLAttachment(email,reportType + " report","Hello!\n\n\tWe attached to the email the report file.\n\nHave a good day,\nShoes Shop team.");

        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return xmlFilePath;
    }

}
