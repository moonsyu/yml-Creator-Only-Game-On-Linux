# 게임 서버 YML 생성기

## 소개

Ubuntu와 Linux 서버에서 실행할 게임 전용 서버의 `docker-compose.yml`을 만드는 Electron 앱입니다. 데스크톱 앱과 웹 브라우저에서 설정을 입력하고 YAML을 미리 본 뒤 내려받을 수 있습니다.

## 지원 게임

### Palworld

- `thijsvanloef/palworld-server-docker:latest`
- `jammsen/palworld-dedicated-server:latest`
- 접속, 게임플레이, 백업, 자동 업데이트 등 이미지별 환경변수 지원

### Core Keeper

- `escaping/core-keeper-dedicated:latest`
- 기본 SDR(Game ID) 접속과 UDP 직접 연결 모드 지원
- 월드 이름·인덱스·시드·모드·시즌 설정
- PUID/PGID, ARM64 장치, DepotDownloader 설정
- mod.io 모드 설정
- 서버 프로그램과 월드 데이터 볼륨 분리

Core Keeper 설정과 볼륨 경로는 [escapingnetwork/core-keeper-dedicated 공식 문서](https://github.com/escapingnetwork/core-keeper-dedicated)를 따릅니다.

## 웹 버전

[GitHub Pages에서 게임 서버 YML 생성기 열기](https://moonsyu.github.io/yml-Creator-Only-Game-On-Linux/)

## 주요 기능

- 게임과 Docker 이미지 선택
- 입력값별 적용·복원과 전체 초기화
- Docker Compose YAML 실시간 미리보기
- 브라우저에서 `docker-compose.yml` 다운로드
- Electron 앱에서 설정을 로컬에 저장하고 다시 불러오기
- 기존 Palworld 저장 데이터와의 하위 호환

## 소스에서 실행

Node.js가 설치된 환경에서 `code/` 폴더로 이동해 실행합니다.

```bash
cd code
npm install
npm start
```

## 검사와 빌드

```bash
cd code

# 생성 로직 테스트
npm test

# JavaScript 문법 검사
npm run check

# Windows 포터블 실행 파일 생성
npm run dist:win:portable
```

## 생성된 YML 실행

Docker Compose 파일을 내려받은 폴더에서 다음 명령을 실행합니다.

```bash
docker compose up -d
```

로그 확인:

```bash
# Palworld
docker compose logs -f palworld

# Core Keeper
docker compose logs -f core-keeper
```

Core Keeper의 자동 생성 Game ID는 다음 명령으로 확인할 수 있습니다.

```bash
docker exec -it core-keeper-dedicated cat /home/steam/core-keeper-dedicated/GameID.txt
```

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.
