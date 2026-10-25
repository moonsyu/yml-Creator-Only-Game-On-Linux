(function (root) {
    'use strict';

    // Docker Hub v2 API (search ordering=-pull_count and /v2/repositories/<name>/), checked 2026-10-25.
    // Only game-server images are compared; tools, exporters and unrelated "core-keeper" IoT images are excluded.
    const checkedAt = '2026-10-25';
    const games = {
        palworld: {
            stateKey: 'creator',
            label: 'Palworld',
            images: [
                {
                    id: 'thijsvanloef',
                    repo: 'thijsvanloef/palworld-server-docker',
                    tag: 'latest',
                    icon: '🚀',
                    pulls: 2077073,
                    stars: 72,
                    updated: '2026-10-23',
                    summary: '가장 많이 쓰이는 Palworld 이미지입니다. 문서가 잘 정리되어 있고 백업·자동 재부팅·자동 업데이트·REST API를 환경변수로 제어합니다.',
                    traits: ['자동 백업·업데이트', 'ARM64(Box64) 지원', '플레이어 접속 로그'],
                    docs: 'https://palworld-server-docker.loef.dev/'
                },
                {
                    id: 'jammsen',
                    repo: 'jammsen/palworld-dedicated-server',
                    tag: 'latest',
                    icon: '⚡',
                    pulls: 447497,
                    stars: 64,
                    updated: '2026-08-01',
                    summary: 'Discord 웹훅 알림과 플레이어 감지 기반 재시작이 강점인 이미지입니다. 백업 보존 개수를 정해 자동 정리합니다.',
                    traits: ['Discord 웹훅 알림', 'Cron 백업·재시작', '플레이어 감지'],
                    docs: 'https://github.com/jammsen/docker-palworld-dedicated-server'
                }
            ]
        },
        corekeeper: {
            stateKey: 'coreKeeperCreator',
            label: 'Core Keeper',
            images: [
                {
                    id: 'escaping',
                    repo: 'escaping/core-keeper-dedicated',
                    tag: 'latest',
                    icon: '⛏️',
                    pulls: 475656,
                    stars: 9,
                    updated: '2026-02-27',
                    summary: '현재 유지보수되는 Core Keeper 이미지입니다. 직접 연결, 콘텐츠 번들, mod.io 모드, ARM64 장치를 지원합니다.',
                    traits: ['SDR·직접 연결', 'mod.io 모드', 'ARM64 지원'],
                    docs: 'https://github.com/escapingnetwork/core-keeper-dedicated'
                },
                {
                    id: 'arguser',
                    repo: 'arguser/core-keeper-dedicated',
                    tag: 'latest',
                    icon: '🪨',
                    pulls: 6294,
                    stars: 2,
                    updated: '2022-06-23',
                    summary: 'escaping 이미지의 원본 프로젝트입니다. 2022년 이후 이미지가 갱신되지 않아 월드 이름·시드·Game ID·인원만 설정할 수 있습니다. 게임 파일은 시작할 때 SteamCMD로 최신 버전을 받습니다.',
                    traits: ['설정이 단순함', 'SDR(Game ID) 접속 전용', '2022년 이후 갱신 없음'],
                    warning: '이미지가 오래되어 최신 게임 버전에서 실행이 보장되지 않습니다. 새 서버라면 1위 이미지를 권장합니다.',
                    docs: 'https://hub.docker.com/r/arguser/core-keeper-dedicated'
                }
            ]
        },
        valheim: {
            stateKey: 'valheimCreator',
            label: 'Valheim',
            images: [
                {
                    id: 'lloesche',
                    repo: 'lloesche/valheim-server',
                    tag: 'latest',
                    icon: '⚔️',
                    pulls: 35211430,
                    stars: 220,
                    updated: '2026-10-20',
                    summary: 'community-valheim-tools가 유지보수하는 가장 인기 있는 이미지입니다. 자동 업데이트·백업·BepInEx·ValheimPlus와 모드 실행 묶음을 지원합니다.',
                    traits: ['BepInEx·ValheimPlus', '모드 실행 묶음 ZIP', '상태 HTTP·Supervisor'],
                    docs: 'https://github.com/community-valheim-tools/valheim-server-docker'
                },
                {
                    id: 'mbround18',
                    repo: 'mbround18/valheim',
                    tag: '3',
                    icon: '🛡️',
                    pulls: 7133302,
                    stars: 64,
                    updated: '2026-10-15',
                    summary: 'Odin 관리 도구가 들어 있는 rootless 이미지입니다. Thunderstore 모드를 MODS 목록으로 자동 설치하고 백업·업데이트·재시작 예약과 Discord 웹훅을 지원합니다.',
                    traits: ['MODS 자동 설치', 'Odin 예약 작업', 'rootless 실행'],
                    docs: 'https://github.com/mbround18/valheim-docker'
                }
            ]
        }
    };

    function rank(game, metric, id) {
        const sorted = [...games[game].images].sort((a, b) => b[metric] - a[metric]);
        return sorted.findIndex(image => image.id === id) + 1;
    }

    function find(game, id) {
        return games[game]?.images.find(image => image.id === id) || null;
    }

    function imageRef(game, id) {
        const image = find(game, id);
        return image ? `${image.repo}:${image.tag}` : '';
    }

    function formatCount(value) {
        if (value >= 100000000) return `${(value / 100000000).toFixed(1).replace(/\.0$/, '')}억`;
        if (value >= 10000) return `${Math.round(value / 10000).toLocaleString('ko-KR')}만`;
        return value.toLocaleString('ko-KR');
    }

    const api = { checkedAt, games, rank, find, imageRef, formatCount };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.ImageCatalog = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
