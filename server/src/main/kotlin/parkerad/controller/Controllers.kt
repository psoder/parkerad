package parkerad.controller

import org.springframework.web.bind.annotation.*
import parkerad.integration.BenchDB
import parkerad.model.*

@RestController
class BenchController {

    val benchDB = BenchDB()

    @GetMapping("/benches") fun getBenches(): List<Bench> = benchDB.getBenches()

    @GetMapping("/reviews") fun getReview(): List<Review> = benchDB.getReviews()

    @GetMapping("/benchReviews") fun getBenchReviews(): List<BenchReview> = benchDB.getBenchReviews()

    @GetMapping("/benches/{id}") fun getBench(@PathVariable id: Int): Bench? = benchDB.getBench(id)
    
    @GetMapping("/reviews/{id}") fun getReview(@PathVariable id: Int): Review? = benchDB.getReview(id)

    @GetMapping("/benchReview/{id}") fun getBenchReview(@PathVariable id: Int): BenchReview? = benchDB.getBenchReview(id)

}
