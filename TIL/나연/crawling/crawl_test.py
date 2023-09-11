from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import csv

# f = open('test.csv', 'a', newline = '')
# wr = csv.writer(f)
df = pd.DataFrame(columns=['category', 'date', 'title', 'content'])

# 언론사 번호
company = ['001', '002', '003', '005', '006', '007', '008', '009', '011', '014', '015', '016', '018', '020', '021', '022', '023', '024', '025', '028', '029', '030', '031', '032', '033', '036', '037', '044', '047', '050', '052', '053', '055', '056', '057', '065', '076', '079', '081', '082', '087', '088', '092', '094', '108', '109', '112', '117', '119', '123', '127', '138', '139', '144', '145', '213', '214', '215', '216', '236', '241', '243', '262', '277', '293', '296', '308', '310', '311', '312', '343', '346', '347', '351', '353', '356', '366', '374', '382', '396', '398', '408', '409', '410', '411', '413', '415', '416', '417', '421', '422', '425', '427', '433', '435', '436', '437', '438', '439', '440', '442', '445', '448', '449', '450', '465', '468', '469', '470', '472', '477', '481', '584', '586', '607', '609', '629', '640', '648', '654', '655', '656', '657', '658', '659', '660', '661', 
'662', '665', '666']

# 언론사별 기사 일련번호
# 0000000000 ~ 9999999999
# https://n.news.naver.com/article/001/0000000001
for c in company:
    try:
       # https://n.news.naver.com/article/666/001 -> 없는 링크
        html = urlopen(f'https://n.news.naver.com/article/{c}/0000000001')
        print(f'{c}번 언론사의 첫 번째 기사')
        bsObject = BeautifulSoup(html, "html.parser")

        news_categories = bsObject.select(".media_end_categorize_item")
        arr = []

        for news_category in news_categories:
            arr.append(news_category.text)

        category = arr if arr else ['']  # 데이터가 없으면 공백 문자열로 저장

        news_date = bsObject.select_one(".media_end_head_info_datestamp_time").text
        date = " ".join(news_date.strip().split()) if news_date else ''

        news_title = bsObject.select_one("#title_area").text
        title = " ".join(news_title.strip().split()) if news_title else ''

        news_content = bsObject.select_one("#newsct_article").text
        content = " ".join(news_content.strip().split()) if news_content else ''

        # 데이터를 DataFrame에 추가
        df.loc[len(df)] = [category, date, title, content]

    except:
        continue
        print(f'{c}번 언론사는 없음')

print(df.head(10))
# wr.writerow([categery, date, title, content])

# df.to_csv("test.csv", index = False, encoding='cp949')

# f.close()