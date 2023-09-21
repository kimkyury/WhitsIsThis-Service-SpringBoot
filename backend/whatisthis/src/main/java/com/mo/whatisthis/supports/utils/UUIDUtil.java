package com.mo.whatisthis.supports.utils;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UUIDUtil {

    private static final char[] UPPER_CASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
    private static final char[] NUMBERS = "0123456789".toCharArray();
    private static final char[] SPECIAL_CHARACTERS = "!@#$%^&*".toCharArray();

    public static void main(String[] args) {
        System.out.println(generateEfficientUUID());
    }

    public static String generateEfficientUUID() {
        Random random = ThreadLocalRandom.current();
        char[] result = new char[10];

        // 각각의 세트에서 하나씩 확보
        result[0] = UPPER_CASE_LETTERS[random.nextInt(UPPER_CASE_LETTERS.length)];
        result[1] = NUMBERS[random.nextInt(NUMBERS.length)];
        result[2] = SPECIAL_CHARACTERS[random.nextInt(SPECIAL_CHARACTERS.length)];

        // 나머지 문자들을 모든 문자 세트를 사용하여 무작위로 채우기
        char[] allChars = (new String(UPPER_CASE_LETTERS) + new String(NUMBERS) + new String(
            SPECIAL_CHARACTERS)).toCharArray();

        for (int i = 3; i < 10; i++) {
            result[i] = allChars[random.nextInt(allChars.length)];
        }

        // 배열의 요소를 무작위로 섞기
        for (int i = result.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }

        return new String(result);
    }
}
