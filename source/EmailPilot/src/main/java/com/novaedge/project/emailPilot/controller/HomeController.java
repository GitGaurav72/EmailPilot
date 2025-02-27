package com.novaedge.project.emailPilot.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "index";  // This will look for index.html or index.jsp in templates or static folders
    }
}
