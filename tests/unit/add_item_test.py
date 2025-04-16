import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup


class MyTestCase(unittest.TestCase):
    def test_something(self):
        driver = webdriver.Firefox()
        driver.implicitly_wait(0.5)
        driver.maximize_window()
        driver.get("http://127.0.0.1:5000/add")
        h1_text = driver.find_element(By.XPATH, "//html/body/h1").text
        # assert h1_text == 'Hello World!'
        print(h1_text)
        driver.quit()
        # self.assertEqual(True, False)  # add assertion here


    if __name__ == '__main__':
        unittest.main()

