from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": ChromeDriverManager().install()}
    return Browser("chrome", **executable_path, headless=True)


def scrape_info():
    browser = init_browser()

    # Visit visitcostarica.herokuapp.com
    url = "https://visitcostarica.herokuapp.com/"
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    # Get the average temps
    # @TODO: YOUR CODE HERE!
    weather = soup.find('div', id='weather')

    # Get the min avg temp
    min_temp = weather.find_all('strong')[0].text

    # Get the max avg temp
    # @TODO: YOUR CODE HERE!
    max_temp = weather.find_all('strong')[1].text

    # BONUS: Find the src for the sloth image
    # @TODO: YOUR CODE HERE!
    sloth_img = soup.find_all('img', class_='img-fluid animals')[1].get('src')
    real_sloth_img = url+sloth_img
    # Store data in a dictionary
    costa_data = {
        "sloth_img": real_sloth_img,
        "min_temp": min_temp,
        "max_temp": max_temp
    }

    # Quite the browser after scraping
    browser.quit()

    # Return results
    return costa_data
