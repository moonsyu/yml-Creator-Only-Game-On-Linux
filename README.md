# 팰월드 서버 YML 생성기

## 소개
우분투 24.04 LTS에서 개발한 팰월드용 `docker-compose.yml` 생성기입니다.
데스크톱 환경(Electron)에서 작동하며, 사용자가 손쉽게 팰월드 전용 서버의 설정 값을 지정하여 Docker Compose 파일을 생성할 수 있습니다.

## 주요 기능
- **간편한 설정**: 직관적인 UI를 통해 서버 설정을 입력하고 즉시 `docker-compose.yml` 파일을 만듭니다.
- **다양한 서버 이미지 지원**: 널리 쓰이는 Thijsvanloef 및 Jammsen 팰월드 Docker 이미지를 선택할 수 있습니다.
- **설정 값 보존**: 로컬 저장 기능을 통해 입력한 설정과 생성된 YAML 정보를 보존할 수 있습니다.

## 다운로드/실행
Windows 환경에서 바로 실행할 수 있는 파일은 GitHub **Releases** 페이지에서 받을 수 있습니다.
- **릴리스 페이지**: https://github.com/moonsyu/yml-Creator-Only-Game-On-Linux/releases/tag/v0.1.2

- **웹 버전**: https://moonsyu.github.io/yml-Creator-Only-Game-On-Linux/
  - 브라우저에서 바로 YAML 생성이 가능하며, Electron 브리지 없이 동작하므로 `로컬 저장`처럼 데스크톱 전용 기능은 동작하지 않을 수 있습니다.
  - 웹에서는 `YML 다운로드` 버튼으로 생성된 YAML을 바로 파일로 내려받을 수 있습니다. (UTF-8 인코딩을 적용해 한글 깨짐 문제를 해결했습니다.)

- **데스크톱 버전**: `YML 다운로드` 버튼으로 생성된 YAML을 원하는 위치에 직접 저장할 수 있습니다. (UTF-8 인코딩을 적용해 한글 깨짐 문제를 해결했습니다.)

- `palworld-yml-generator-v0.1.2-portable.exe`: 설치 없이 바로 켤 수 있는 단일 포터블 실행 파일
- `palworld-yml-generator-v0.1.2-win-unpacked.zip`: 실행에 필요한 런타임 파일이 포함된 압축 파일

*참고: 코드는 Ubuntu 24.04 LTS에서 작성했지만, 일반 사용자 편의를 위해 Windows 빌드 버전을 릴리스로 제공합니다.*

## 소스에서 실행
Node.js가 설치된 개발 환경에서는 직접 소스 코드를 실행해 볼 수 있습니다.
소스 코드는 루트가 아닌 `code/` 폴더에 정리되어 있으므로 아래 명령을 `code/` 내부에서 실행하세요.

```bash
# code/ 폴더로 이동
cd code

# 종속성 패키지 설치
npm install

# 앱 실행
npm start
```

## 빌드
소스를 수정하거나 직접 실행 파일을 만들고 싶다면 `code/` 폴더에서 아래 명령어를 실행하세요.

```bash
# code/ 폴더로 이동
cd code

# 코드 문법 검사
npm run check

# 코드 빌드 검사
npm run build

# Windows 포터블 실행 파일 생성
npm run dist:win:portable
```

## 생성된 YML 실행 방법
우분투 및 리눅스 서버에서 만들어진 `docker-compose.yml` 파일을 실행하는 과정입니다. 모든 명령은 해당 yml 파일이 있는 경로에서 입력해 주세요.

서버에 Docker가 없다면 먼저 Docker 환경을 구축해야 합니다.

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y docker-compose
cd /path/to/generated-compose-folder
docker-compose up -d
docker logs -f palworld-server
```

로그를 띄우는 명령어는 앱에서 지정하는 기본 컨테이너 이름인 `palworld-server`를 바탕으로 작성했습니다.

## 저장 데이터
앱에서 지정한 설정값은 수동 저장 기능을 통해 로컬 시스템에 보존할 수 있습니다. 로컬에 저장해두면 앱을 껐다 켜도 저장된 설정을 불러와 사용할 수 있습니다.

## 라이선스
이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.
