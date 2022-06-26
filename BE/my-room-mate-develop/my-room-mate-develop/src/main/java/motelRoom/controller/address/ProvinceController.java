package motelRoom.controller.address;

import motelRoom.dto.address.province.ProvinceDetailDto;
import motelRoom.service.addressService.provinceService.ProvinceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/province")
public class ProvinceController {
    private final ProvinceService provinceService;

    public ProvinceController(ProvinceService provinceService) {
        this.provinceService = provinceService;
    }

    /** GET ALL PROVINCE **/
    @GetMapping
    public List<ProvinceDetailDto> findAll() {return provinceService.findAll();}

    /** GET PROVINCE BY ID **/
    @GetMapping("/{id}")
    public ResponseEntity<ProvinceDetailDto> findById(@PathVariable Integer id){
        return ResponseEntity.ok(provinceService.findById(id));
    }


}
