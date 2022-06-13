package parkerad.controller

import org.springframework.web.bind.annotation.*
import parkerad.integration.BenchDB
import parkerad.model.*

@RestController
class BenchController {

    val benchDB = BenchDB()

    @GetMapping("/benches") fun getBenches(): List<Bench> = benchDB.getBenches()

    @GetMapping("/reviews") fun getReview(): List<Review> = benchDB.getReviews()

    @GetMapping("/benches/{id}") fun getBench(@PathVariable id: Int): Bench? = benchDB.getBench(id)
    
    @GetMapping("/reviews/{id}") fun getReview(@PathVariable id: Int): Review? = benchDB.getReview(id)


    @GetMapping("/benches/{id}/reviews")
    fun getBenchReviews(@PathVariable id: Int): List<Review> = benchDB.reviewsForBench(id)
}
