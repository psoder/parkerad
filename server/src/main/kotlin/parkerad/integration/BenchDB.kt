package parkerad.integration

import parkerad.model.*

class BenchDB {

    private val users = mapOf(0 to User(0, "Adam Degen"), 1 to User(1, "Snöderlund"))

    private val reviews = listOf(
                    Review(0, 3.0, "Acceptable", users[0]!!),
                    Review(1, 5.0, "Excellent", users[1]!!),
                    Review(2, 2.0, "Eh", users[1]!!)
            )

    private val benches = listOf(
                    Bench(0, "Fippelistan0", 0.0, 0.0, "A very nice place0"),
                    Bench(1, "Fippelistan1", 1.0, 1.0, "A very nice place1"),
                    Bench(2, "Fippelistan2", 2.0, 2.0, "A very nice place2")
            )

    private val benchReviews: List<BenchReview> = listOf(
                    BenchReview(benches[0], listOf(reviews[0], reviews[1])),
                    BenchReview(benches[1], listOf(reviews[2])),
                    BenchReview(benches[2], listOf())
            )

    fun getBench(benchId: Int): Bench? = benches[benchId]

    fun getBenches(): List<Bench> = benches

    fun getReview(reviewId: Int): Review? = reviews[reviewId]

    fun getReviews(): List<Review> = reviews

    fun getBenchReview(benchId: Int): BenchReview? {
        return benchReviews.find { it.bench.id.equals(benchId) }
    }

    fun getBenchReviews(): List<BenchReview> = benchReviews

}
