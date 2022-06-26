package motelRoom.controller.address;

import motelRoom.dto.address.ward.WardDetailDto;
import motelRoom.service.addressService.wardService.WardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ward")
public class WardController {
    private final WardService wardService;

    public WardController(WardService wardService) {
        this.wardService = wardService;
    }

    /** GET ALL WARD **/
    @GetMapping
    public List<WardDetailDto> findAll() {
        return wardService.findAll();
    }

    /** GET WARD BY ID **/
    @GetMapping("/{id}")
    public ResponseEntity<WardDetailDto> findById(@PathVariable Integer id){
        return  ResponseEntity.ok(wardService.findById(id));
    }
}
