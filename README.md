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

### Valheim · 발헤임

- `ghcr.io/community-valheim-tools/valheim-server:latest`
- 서버·월드 이름, 5자 이상 접속 비밀번호, 서버 목록 공개 여부
- Steam 접속 및 PlayFab 크로스플레이
- 시작 UDP 포트 변경: 기본 `2456-2457`, 크로스플레이 사용 시 `2456-2458`
- 관리자·차단·접속 허용 SteamID64 목록, 추가 서버 실행 인수
- 시간대, PUID/PGID, 자동 업데이트·재시작·백업 주기와 보관 정책
- 기본 서버 / BepInEx / ValheimPlus 선택
- 월드·설정(`/config`)과 서버 프로그램(`/opt/valheim`) 볼륨 분리

Valheim 설정은 [community-valheim-tools/valheim-server-docker 공식 문서](https://github.com/community-valheim-tools/valheim-server-docker)를 따릅니다.
게임 선택에서 Valheim을 적용한 다음 접속 비밀번호를 입력하고 접속 설정을 적용하면 YAML을 내려받을 수 있습니다. 필수 입력값이 잘못되면 미리보기에 오류를 표시하고 다운로드를 막습니다.
기존 월드를 사용하려면 월드·설정 폴더의 `worlds_local`에 세이브를 넣고 월드 이름을 맞춰 주세요. 비워 둔 SteamID 목록은 기존 목록 파일을 유지합니다. 업데이트·재시작·백업 Cron 값을 비우면 해당 주기 작업을 끕니다.

#### ValheimPlus 플레이 편의 설정

Valheim을 선택하면 **5. ValheimPlus 플레이 편의 설정**에서 다음 기능을 직접 조절할 수 있습니다.

- 광물·금속 포탈 통과, 기본 운반 무게, 아이템 스택 배수
- 주변 상자 재료로 제작·건설, 상자 탐색 거리
- 달리기·점프 스태미나 소모 감소: 전투 중에도 적용됩니다.
- 음식 지속 시간 배수와 음식 효과 감소 방지
- 제련소·용광로·숯가마 자동 원료/연료 투입, 생산물 저장과 탐색 거리
- 작업대 건설 범위와 지붕 조건 해제

**이 화면에서 직접 설정**을 선택하거나 **추천 편의값 채우기**를 누른 뒤 값을 조절하고 **적용**하세요. 추천값은 광물 포탈 허용, 운반 무게 600, 스택 2배, 상자 재료 사용, 달리기·점프 소모 25% 감소입니다. 적용하면 ValheimPlus 로더가 함께 선택됩니다. **모드 포함 실행 묶음 ZIP**을 내려받아 서버에서 압축을 풀고 `docker compose up -d`로 실행하세요.

서버와 각 사용자 PC에 같은 버전의 [ValheimPlus 유지보수판](https://github.com/Grantapher/ValheimPlus/releases/latest)이 필요하며 서버 설정이 PC에 동기화됩니다. 다른 모드의 같은 기능을 함께 켜지 않도록 확인하세요. 생성기는 위 설정을 Docker 이미지가 지원하는 `VPCFG_<섹션>_<항목>` 환경변수로 출력합니다. 스택 2배는 `itemStackMultiplier=100`, 소모 25% 감소는 `runStaminaDrain=-25`처럼 [ValheimPlus 설정 단위](https://github.com/Grantapher/ValheimPlus/blob/0.10.3.0/valheim_plus.cfg)에 맞게 변환합니다.

**기존 설정 유지**는 서버의 설정 파일을 그대로 사용하며, 전에 적용한 값을 되돌리지 않습니다. 기능을 해제하려면 직접 설정에서 끄거나 **편의 기능 기본값으로 채우기 → 적용**을 누르고 새 실행 묶음으로 교체하세요. 직접 설정을 사용할 때는 이 화면이 관리하는 항목과 관련 섹션의 활성화 여부가 `valheim_plus.cfg`에 반영됩니다. 첨부한 같은 설정 파일의 동일 항목보다 우선합니다. 기본값으로 되돌리면 해당 편의 섹션은 비활성화됩니다. 자동 투입은 접근 제한을 존중하며 숯가마에는 귀중한 나무와 통나무를 투입하지 않도록 설정합니다.

#### Valheim 모드와 설정을 함께 실행하기

1. **6. 추가 Valheim 모드 설치·설정**에서 Thunderstore 모드 링크 또는 `제작자-모드명-1.2.3`을 한 줄에 하나씩 입력합니다. 버전 없는 ID도 지원합니다.
2. PC에 있는 모드 **ZIP·DLL**을 함께 첨부할 수 있습니다. ZIP은 `BepInEx/plugins`, `plugins` 또는 DLL이 담긴 일반 모드 ZIP을 지원합니다. `manifest.json`의 의존 모드도 자동 설치합니다. DLL 단독 첨부 시 필요한 의존 모드는 직접 목록에 넣어 주세요.
3. 모드가 생성한 **.cfg**를 불러와 편집하거나 파일 이름과 내용을 직접 입력합니다. 파일 이름은 `Example.cfg`처럼 BepInEx 설정 폴더 기준으로 입력합니다.
4. **적용**을 누릅니다. 처음 모드를 추가하면 BepInEx가 선택되며, 서버 옵션에서 ValheimPlus로 변경할 수 있습니다. 모드 적용은 선택한 로더도 함께 적용합니다.
5. **모드 포함 실행 묶음 ZIP 다운로드**를 누르고 서버의 한 폴더에 **전체 압축 해제**합니다. 그 폴더에서 `docker compose up -d`를 실행합니다.

묶음에는 `docker-compose.yml`, `valheim-mods/install.py`, 설치 목록과 첨부 파일, 실행 안내가 포함됩니다. 컨테이너의 시작 훅에서 모드 설치를 먼저 끝내며, 설치에 실패하면 게임 서버 시작을 중단합니다. 로그는 `docker compose logs -f valheim`으로 확인합니다. 생성기는 실행용 파일을 만들며, 브라우저에서 Docker 서버를 직접 시작하지는 않습니다.

- 첨부 ZIP·DLL은 합계 **32 MiB**, 설정 파일은 각각 **128 KiB**, 모드 목록·설정 텍스트의 JSON 저장 크기는 합계 **256 KiB**까지 지원합니다. 파일은 외부로 업로드하지 않고 내려받는 묶음에 포함합니다.
- 데스크톱 로컬 저장에는 모드 목록과 설정 텍스트, 첨부 파일 정보가 저장됩니다. ZIP·DLL 원본은 현재 실행 중에만 보관하므로 앱을 다시 열면 다시 선택해야 합니다. 누락된 첨부가 있으면 묶음 다운로드를 막습니다.
- Thunderstore 모드와 의존 모드는 서버에서 HTTPS로 받습니다. 버전을 생략하면 첫 설치 시 최신 버전을 선택하고 같은 묶음의 재시작에서는 유지합니다. 업그레이드할 때는 원하는 버전을 명시한 새 묶음을 만드세요.
- 기존 서버에서 수정한 설정은 재시작해도 유지합니다. 변경된 묶음을 설치할 때 편집란에 지정된 `.cfg`는 덮어쓰며, 변경 전 파일은 로더 폴더의 `.yml-generator-backups`에 백업합니다. 목록에서 뺀 모드는 생성기가 관리하는 플러그인만 제거하고 수동 설치 파일과 설정은 보존합니다.
- 모드 묶음을 교체할 때는 먼저 `docker compose down`으로 서버를 멈추고, 기존 월드·설정 볼륨 경로를 유지하세요. 월드 폴더는 삭제하지 마세요.
- 서버용 모드를 선택하세요. 클라이언트에 필요한 모드는 플레이어 PC에도 같은 버전으로 설치해야 합니다. 게임 버전과 모드 간 호환성은 각 모드 안내를 확인하세요.

#### Valheim 사용자 PC에 모드 설치하기 (Windows · Steam)

서버에 모드를 설치해도 접속하는 PC에 자동으로 설치되지는 않습니다. 각 사용자는 PC에 필요한 모드와 BepInEx를 별도로 설치해야 합니다. Thunderstore 앱 없이 모드 ZIP을 직접 설치하려면 다음 순서를 따르세요.

1. **발헤임을 종료하고 설치 폴더를 여세요.** Steam에서 발헤임을 우클릭한 뒤 **속성 → 설치된 파일 → 찾아보기**를 선택합니다. `valheim.exe`가 있는 폴더가 설치 위치입니다.

   Windows에서 Steam과 발헤임을 기본 위치에 설치했다면 **기본 경로**는 다음과 같습니다. Steam 설치 위치나 라이브러리 드라이브를 바꾸셨다면 경로가 다르므로 Steam의 찾아보기로 실제 위치를 확인하세요.

   ```text
   C:\Program Files (x86)\Steam\steamapps\common\Valheim
   ```

2. **BepInEx를 설치하세요.** [Valheim용 BepInEx 설치팩](https://thunderstore.io/c/valheim/p/denikson/BepInExPack_Valheim/) ZIP을 별도 폴더에 풀고, 그 안의 **`BepInExPack_Valheim` 폴더 내부 내용물**을 발헤임 설치 폴더에 복사합니다. BepInEx는 처음 한 번 설치하면 되며, 이미 설치되어 있다면 필요한 버전인지 확인하세요. 복사 후 구조는 다음과 같습니다.

   ```text
   Valheim/
   ├─ valheim.exe
   ├─ winhttp.dll
   ├─ doorstop_config.ini
   └─ BepInEx/
   ```

3. **사용할 모드 ZIP을 풀어서 설치하세요.** 일반적인 DLL 모드는 `BepInEx\plugins\모드이름\` 폴더에 DLL과 필요한 부속 파일을 함께 넣습니다. 부속 파일의 폴더 구조는 유지하세요. ZIP 안에 이미 `BepInEx` 폴더가 있다면 발헤임 설치 폴더의 같은 폴더에 합치세요. `plugins`, `config`, `patchers` 폴더가 바로 들어 있다면 각각 `BepInEx` 아래의 같은 폴더에 합치세요. 모드가 별도 설치 방법을 안내하면 그 안내를 우선 따르세요.

   ```text
   Valheim/BepInEx/plugins/모드이름/
   ├─ 모드.dll
   └─ 필요한 부속 파일들
   ```

   사용자 PC에 수동 설치할 때는 ZIP 자체를 `plugins`에 넣는 것으로 적용되지 않습니다. 압축을 풀어 실제 파일을 넣어 주세요. [BepInEx 플러그인 설치 위치 안내](https://docs.bepinex.dev/v5.4.11/articles/dev_guide/plugin_tutorial/2_plugin_start.html)를 참고하세요.

4. **선행 모드와 버전을 확인하세요.** 각 모드가 요구하는 선행 모드도 설치합니다. 서버와 PC 양쪽에 필요한 모드는 버전을 맞추고, 서버 전용 모드인지 PC에도 필요한 모드인지는 해당 모드의 안내를 확인하세요. 수동 설치에서는 ZIP의 `manifest.json`만 넣어도 선행 모드가 자동 설치되는 것은 아닙니다.

5. **Steam에서 발헤임을 실행하고 서버에 접속하세요.** Windows에서 위와 같이 수동 설치했다면 Steam으로 실행할 수 있습니다. BepInEx 콘솔과 `BepInEx\LogOutput.log`에서 모드 로딩 여부와 오류를 확인하세요.

플레이어에게는 **각 모드의 원본 ZIP, 필요한 선행 모드 목록과 버전, 설치 안내**를 전달하세요. 생성기에서 내려받는 **모드 포함 실행 묶음 ZIP은 Linux 서버 실행용**입니다. 생성기에는 원본 모드 ZIP 여러 개를 압축 해제 없이 첨부할 수 있지만, 사용자 PC에 수동 설치할 때는 위와 같이 압축을 풀어 설치해야 합니다.

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

# Python 모드 설치기 검사 (Python 3 필요)
npm run test:installer

# templates/valheim-install.py 변경 후 브라우저용 소스 갱신
npm run prepare:mods

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

# Valheim
docker compose logs -f valheim
```

Core Keeper의 자동 생성 Game ID는 다음 명령으로 확인할 수 있습니다.

```bash
docker exec -it core-keeper-dedicated cat /home/steam/core-keeper-dedicated/GameID.txt
```

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.
