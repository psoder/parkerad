package parkerad

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ParkeradApplication

fun main(args: Array<String>) {
	runApplication<ParkeradApplication>(*args)
}
