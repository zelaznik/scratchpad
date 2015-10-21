from settings_private import DB_USERNAME, DB_PASSWORD

BOT_NAME = 'livingsocial'
SPIDER_MODULES = ['scraper_app.spiders']

DATABASE = {
    'drivername': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': 'scrape'
}
