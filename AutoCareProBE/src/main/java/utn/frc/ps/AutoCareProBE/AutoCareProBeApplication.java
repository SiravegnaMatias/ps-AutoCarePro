package utn.frc.ps.AutoCareProBE;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableAsync
public class AutoCareProBeApplication {

	private static final Logger log = LoggerFactory.getLogger(AutoCareProBeApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AutoCareProBeApplication.class, args);
	}

	@Bean
	public ThreadPoolTaskExecutor taskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("MyAsyncThread-");
		executor.setRejectedExecutionHandler(
				(r, executor1) -> log.warn("Task rejected, thread pool is full and queue is also full"));
		executor.initialize();
		return executor;
	}

}
