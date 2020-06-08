# bin/universal-deploy.sh -hIPserver
# bin/universal-deploy.sh -h168......

#!/bin/bash

# colors for output
RED='\033[0;31m'
NC='\033[0m' # No Color
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'


REMOTE_USER='root'
REMOTE_HOST='159.65.110.137'
REMOTE_ROOT_FOLDER='/var/www/exchange-client/'
SSH_PORT=22
LOCAL_DIST_FOLDER='./build/*'
LOCAL_ROOT_FOLDER='./'
SSH_KEY=''

REMOTE_COMMAND_CLEAR_DIST="
	cd ${REMOTE_ROOT_FOLDER} \
	&& rm -rf ./*"


BRANCH=`git rev-parse --abbrev-ref HEAD`
echo -e "${YELLOW}\n***********************************************************************${NC}"

while test $# -gt 0; do
    case "$1" in
        -i)
            shift
            SSH_KEY="-i $1"
            ;;
        -h)
            shift
            REMOTE_HOST="$1"
            ;;
        *)
            break
            ;;
    esac
    shift
done

# clearing remote build dir
echo -e "\n${CYAN}[${BRANCH}]${GREEN} Execute remote command...${NC}"
ssh ${SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} -p${SSH_PORT} -t "${REMOTE_COMMAND_CLEAR_DIST}"
echo -e "\n${CYAN}[${BRANCH}]${GREEN} Done${NC}"

# copy files to servers
if hash rsync 2>/dev/null; then
    echo -e "\n${CYAN}[${BRANCH}]${GREEN} Building ...${NC}"
    npm run build
    echo -e "\n${CYAN}[${BRANCH}]${GREEN} Copy files (rsync)...${NC}"
    rsync -p --chmod=+rx -v -r -e "ssh -p $SSH_PORT ${SSH_KEY}" ${LOCAL_DIST_FOLDER} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_ROOT_FOLDER}
elif hash scp 2>/dev/null; then
    echo -e "\n${CYAN}[${BRANCH}]${GREEN} Building ...${NC}"
    npm run build
    echo -e "\n${CYAN}[${BRANCH}]${GREEN} Copy files (scp)...${NC}"
    scp -r -P ${SSH_PORT} ${SSH_KEY} ${LOCAL_DIST_FOLDER} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_ROOT_FOLDER}
 else
    echo -e "\n${RED}Required rsync or scp${NC}"
    exit 1;
fi
