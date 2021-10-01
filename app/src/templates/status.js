export const getLoading = () => {
  return ` <div class="status">
             <div>
              <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              <span class="sr-only">Loading...</span>
              </div>
            </div>`;
};

export const getError = () => {
  return ` <div class="status">
              <div>
              <i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>
              <span>Erro ao buscar dados</span>
              </div>
            </div>`;
};
