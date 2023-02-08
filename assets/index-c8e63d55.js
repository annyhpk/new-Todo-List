import { _ as _inheritsLoose, d as _extends, n as noop, i as isServer, e as isValidTimeout, f as timeUntilStale, g as focusManager, h as replaceEqualDeep, k as getLogger, s as shallowEqualObjects, l as isCancelledError, m as notifyManager, o as Subscribable, p as getDefaultState, R as React, q as parseMutationArgs, v as useQueryClient, w as parseQueryArgs, c as createStyled, r as reactExports, j as jsx, b as jsxs } from "./index-1cb03450.js";
import { u as useInput, i as instance, I as Input } from "./api-18387136.js";
var QueryObserver = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(QueryObserver2, _Subscribable);
  function QueryObserver2(client, options) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.client = client;
    _this.options = options;
    _this.trackedProps = [];
    _this.selectError = null;
    _this.bindMethods();
    _this.setOptions(options);
    return _this;
  }
  var _proto = QueryObserver2.prototype;
  _proto.bindMethods = function bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  };
  _proto.onSubscribe = function onSubscribe() {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  };
  _proto.shouldFetchOnReconnect = function shouldFetchOnReconnect() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
  };
  _proto.shouldFetchOnWindowFocus = function shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
  };
  _proto.destroy = function destroy() {
    this.listeners = [];
    this.clearTimers();
    this.currentQuery.removeObserver(this);
  };
  _proto.setOptions = function setOptions(options, notifyOptions) {
    var prevOptions = this.options;
    var prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryObserverOptions(options);
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    var mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    var nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  };
  _proto.getOptimisticResult = function getOptimisticResult(options) {
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return this.createResult(query, defaultedOptions);
  };
  _proto.getCurrentResult = function getCurrentResult() {
    return this.currentResult;
  };
  _proto.trackResult = function trackResult(result, defaultedOptions) {
    var _this2 = this;
    var trackedResult = {};
    var trackProp = function trackProp2(key) {
      if (!_this2.trackedProps.includes(key)) {
        _this2.trackedProps.push(key);
      }
    };
    Object.keys(result).forEach(function(key) {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: function get() {
          trackProp(key);
          return result[key];
        }
      });
    });
    if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
      trackProp("error");
    }
    return trackedResult;
  };
  _proto.getNextResult = function getNextResult(options) {
    var _this3 = this;
    return new Promise(function(resolve, reject) {
      var unsubscribe = _this3.subscribe(function(result) {
        if (!result.isFetching) {
          unsubscribe();
          if (result.isError && (options == null ? void 0 : options.throwOnError)) {
            reject(result.error);
          } else {
            resolve(result);
          }
        }
      });
    });
  };
  _proto.getCurrentQuery = function getCurrentQuery() {
    return this.currentQuery;
  };
  _proto.remove = function remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  };
  _proto.refetch = function refetch(options) {
    return this.fetch(_extends({}, options, {
      meta: {
        refetchPage: options == null ? void 0 : options.refetchPage
      }
    }));
  };
  _proto.fetchOptimistic = function fetchOptimistic(options) {
    var _this4 = this;
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return query.fetch().then(function() {
      return _this4.createResult(query, defaultedOptions);
    });
  };
  _proto.fetch = function fetch(fetchOptions) {
    var _this5 = this;
    return this.executeFetch(fetchOptions).then(function() {
      _this5.updateResult();
      return _this5.currentResult;
    });
  };
  _proto.executeFetch = function executeFetch(fetchOptions) {
    this.updateQuery();
    var promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  };
  _proto.updateStaleTimeout = function updateStaleTimeout() {
    var _this6 = this;
    this.clearStaleTimeout();
    if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
      return;
    }
    var time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
    var timeout = time + 1;
    this.staleTimeoutId = setTimeout(function() {
      if (!_this6.currentResult.isStale) {
        _this6.updateResult();
      }
    }, timeout);
  };
  _proto.computeRefetchInterval = function computeRefetchInterval() {
    var _this$options$refetch;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
  };
  _proto.updateRefetchInterval = function updateRefetchInterval(nextInterval) {
    var _this7 = this;
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(function() {
      if (_this7.options.refetchIntervalInBackground || focusManager.isFocused()) {
        _this7.executeFetch();
      }
    }, this.currentRefetchInterval);
  };
  _proto.updateTimers = function updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  };
  _proto.clearTimers = function clearTimers() {
    this.clearStaleTimeout();
    this.clearRefetchInterval();
  };
  _proto.clearStaleTimeout = function clearStaleTimeout() {
    if (this.staleTimeoutId) {
      clearTimeout(this.staleTimeoutId);
      this.staleTimeoutId = void 0;
    }
  };
  _proto.clearRefetchInterval = function clearRefetchInterval() {
    if (this.refetchIntervalId) {
      clearInterval(this.refetchIntervalId);
      this.refetchIntervalId = void 0;
    }
  };
  _proto.createResult = function createResult(query, options) {
    var prevQuery = this.currentQuery;
    var prevOptions = this.options;
    var prevResult = this.currentResult;
    var prevResultState = this.currentResultState;
    var prevResultOptions = this.currentResultOptions;
    var queryChange = query !== prevQuery;
    var queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    var prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    var state = query.state;
    var dataUpdatedAt = state.dataUpdatedAt, error = state.error, errorUpdatedAt = state.errorUpdatedAt, isFetching = state.isFetching, status = state.status;
    var isPreviousData = false;
    var isPlaceholderData = false;
    var data;
    if (options.optimisticResults) {
      var mounted = this.hasListeners();
      var fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      var fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        isFetching = true;
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
    }
    if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult == null ? void 0 : prevQueryResult.isSuccess) && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
        data = this.selectResult;
      } else {
        try {
          this.selectFn = options.select;
          data = options.select(state.data);
          if (options.structuralSharing !== false) {
            data = replaceEqualDeep(prevResult == null ? void 0 : prevResult.data, data);
          }
          this.selectResult = data;
          this.selectError = null;
        } catch (selectError) {
          getLogger().error(selectError);
          this.selectError = selectError;
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && (status === "loading" || status === "idle")) {
      var placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            if (options.structuralSharing !== false) {
              placeholderData = replaceEqualDeep(prevResult == null ? void 0 : prevResult.data, placeholderData);
            }
            this.selectError = null;
          } catch (selectError) {
            getLogger().error(selectError);
            this.selectError = selectError;
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = placeholderData;
        isPlaceholderData = true;
      }
    }
    if (this.selectError) {
      error = this.selectError;
      data = this.selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    var result = {
      status,
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
      isIdle: status === "idle",
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      errorUpdateCount: state.errorUpdateCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && status !== "loading",
      isLoadingError: status === "error" && state.dataUpdatedAt === 0,
      isPlaceholderData,
      isPreviousData,
      isRefetchError: status === "error" && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  };
  _proto.shouldNotifyListeners = function shouldNotifyListeners(result, prevResult) {
    if (!prevResult) {
      return true;
    }
    var _this$options = this.options, notifyOnChangeProps = _this$options.notifyOnChangeProps, notifyOnChangePropsExclusions = _this$options.notifyOnChangePropsExclusions;
    if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
      return true;
    }
    if (notifyOnChangeProps === "tracked" && !this.trackedProps.length) {
      return true;
    }
    var includedProps = notifyOnChangeProps === "tracked" ? this.trackedProps : notifyOnChangeProps;
    return Object.keys(result).some(function(key) {
      var typedKey = key;
      var changed = result[typedKey] !== prevResult[typedKey];
      var isIncluded = includedProps == null ? void 0 : includedProps.some(function(x) {
        return x === key;
      });
      var isExcluded = notifyOnChangePropsExclusions == null ? void 0 : notifyOnChangePropsExclusions.some(function(x) {
        return x === key;
      });
      return changed && !isExcluded && (!includedProps || isIncluded);
    });
  };
  _proto.updateResult = function updateResult(notifyOptions) {
    var prevResult = this.currentResult;
    this.currentResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if (shallowEqualObjects(this.currentResult, prevResult)) {
      return;
    }
    var defaultNotifyOptions = {
      cache: true
    };
    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify(_extends({}, defaultNotifyOptions, notifyOptions));
  };
  _proto.updateQuery = function updateQuery() {
    var query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    var prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  };
  _proto.onQueryUpdate = function onQueryUpdate(action) {
    var notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error" && !isCancelledError(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  };
  _proto.notify = function notify(notifyOptions) {
    var _this8 = this;
    notifyManager.batch(function() {
      if (notifyOptions.onSuccess) {
        _this8.options.onSuccess == null ? void 0 : _this8.options.onSuccess(_this8.currentResult.data);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(_this8.currentResult.data, null);
      } else if (notifyOptions.onError) {
        _this8.options.onError == null ? void 0 : _this8.options.onError(_this8.currentResult.error);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(void 0, _this8.currentResult.error);
      }
      if (notifyOptions.listeners) {
        _this8.listeners.forEach(function(listener) {
          listener(_this8.currentResult);
        });
      }
      if (notifyOptions.cache) {
        _this8.client.getQueryCache().notify({
          query: _this8.currentQuery,
          type: "observerResultsUpdated"
        });
      }
    });
  };
  return QueryObserver2;
}(Subscribable);
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (options.enabled !== false) {
    var value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}
var MutationObserver = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(MutationObserver2, _Subscribable);
  function MutationObserver2(client, options) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.client = client;
    _this.setOptions(options);
    _this.bindMethods();
    _this.updateResult();
    return _this;
  }
  var _proto = MutationObserver2.prototype;
  _proto.bindMethods = function bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  };
  _proto.setOptions = function setOptions(options) {
    this.options = this.client.defaultMutationOptions(options);
  };
  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      var _this$currentMutation;
      (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.removeObserver(this);
    }
  };
  _proto.onMutationUpdate = function onMutationUpdate(action) {
    this.updateResult();
    var notifyOptions = {
      listeners: true
    };
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error") {
      notifyOptions.onError = true;
    }
    this.notify(notifyOptions);
  };
  _proto.getCurrentResult = function getCurrentResult() {
    return this.currentResult;
  };
  _proto.reset = function reset() {
    this.currentMutation = void 0;
    this.updateResult();
    this.notify({
      listeners: true
    });
  };
  _proto.mutate = function mutate(variables, options) {
    this.mutateOptions = options;
    if (this.currentMutation) {
      this.currentMutation.removeObserver(this);
    }
    this.currentMutation = this.client.getMutationCache().build(this.client, _extends({}, this.options, {
      variables: typeof variables !== "undefined" ? variables : this.options.variables
    }));
    this.currentMutation.addObserver(this);
    return this.currentMutation.execute();
  };
  _proto.updateResult = function updateResult() {
    var state = this.currentMutation ? this.currentMutation.state : getDefaultState();
    var result = _extends({}, state, {
      isLoading: state.status === "loading",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    });
    this.currentResult = result;
  };
  _proto.notify = function notify(options) {
    var _this2 = this;
    notifyManager.batch(function() {
      if (_this2.mutateOptions) {
        if (options.onSuccess) {
          _this2.mutateOptions.onSuccess == null ? void 0 : _this2.mutateOptions.onSuccess(_this2.currentResult.data, _this2.currentResult.variables, _this2.currentResult.context);
          _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(_this2.currentResult.data, null, _this2.currentResult.variables, _this2.currentResult.context);
        } else if (options.onError) {
          _this2.mutateOptions.onError == null ? void 0 : _this2.mutateOptions.onError(_this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
          _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(void 0, _this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
        }
      }
      if (options.listeners) {
        _this2.listeners.forEach(function(listener) {
          listener(_this2.currentResult);
        });
      }
    });
  };
  return MutationObserver2;
}(Subscribable);
function createValue() {
  var _isReset = false;
  return {
    clearReset: function clearReset() {
      _isReset = false;
    },
    reset: function reset() {
      _isReset = true;
    },
    isReset: function isReset() {
      return _isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = /* @__PURE__ */ React.createContext(createValue());
var useQueryErrorResetBoundary = function useQueryErrorResetBoundary2() {
  return React.useContext(QueryErrorResetBoundaryContext);
};
function shouldThrowError(suspense, _useErrorBoundary, params) {
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary.apply(void 0, params);
  }
  if (typeof _useErrorBoundary === "boolean")
    return _useErrorBoundary;
  return !!suspense;
}
function useMutation(arg1, arg2, arg3) {
  var mountedRef = React.useRef(false);
  var _React$useState = React.useState(0), forceUpdate = _React$useState[1];
  var options = parseMutationArgs(arg1, arg2, arg3);
  var queryClient = useQueryClient();
  var obsRef = React.useRef();
  if (!obsRef.current) {
    obsRef.current = new MutationObserver(queryClient, options);
  } else {
    obsRef.current.setOptions(options);
  }
  var currentResult = obsRef.current.getCurrentResult();
  React.useEffect(function() {
    mountedRef.current = true;
    var unsubscribe = obsRef.current.subscribe(notifyManager.batchCalls(function() {
      if (mountedRef.current) {
        forceUpdate(function(x) {
          return x + 1;
        });
      }
    }));
    return function() {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);
  var mutate = React.useCallback(function(variables, mutateOptions) {
    obsRef.current.mutate(variables, mutateOptions).catch(noop);
  }, []);
  if (currentResult.error && shouldThrowError(void 0, obsRef.current.options.useErrorBoundary, [currentResult.error])) {
    throw currentResult.error;
  }
  return _extends({}, currentResult, {
    mutate,
    mutateAsync: currentResult.mutate
  });
}
function useBaseQuery(options, Observer) {
  var mountedRef = React.useRef(false);
  var _React$useState = React.useState(0), forceUpdate = _React$useState[1];
  var queryClient = useQueryClient();
  var errorResetBoundary = useQueryErrorResetBoundary();
  var defaultedOptions = queryClient.defaultQueryObserverOptions(options);
  defaultedOptions.optimisticResults = true;
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
    if (defaultedOptions.cacheTime === 0) {
      defaultedOptions.cacheTime = 1;
    }
  }
  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }
  var _React$useState2 = React.useState(function() {
    return new Observer(queryClient, defaultedOptions);
  }), observer = _React$useState2[0];
  var result = observer.getOptimisticResult(defaultedOptions);
  React.useEffect(function() {
    mountedRef.current = true;
    errorResetBoundary.clearReset();
    var unsubscribe = observer.subscribe(notifyManager.batchCalls(function() {
      if (mountedRef.current) {
        forceUpdate(function(x) {
          return x + 1;
        });
      }
    }));
    observer.updateResult();
    return function() {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [errorResetBoundary, observer]);
  React.useEffect(function() {
    observer.setOptions(defaultedOptions, {
      listeners: false
    });
  }, [defaultedOptions, observer]);
  if (defaultedOptions.suspense && result.isLoading) {
    throw observer.fetchOptimistic(defaultedOptions).then(function(_ref) {
      var data = _ref.data;
      defaultedOptions.onSuccess == null ? void 0 : defaultedOptions.onSuccess(data);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(data, null);
    }).catch(function(error) {
      errorResetBoundary.clearReset();
      defaultedOptions.onError == null ? void 0 : defaultedOptions.onError(error);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(void 0, error);
    });
  }
  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && shouldThrowError(defaultedOptions.suspense, defaultedOptions.useErrorBoundary, [result.error, observer.getCurrentQuery()])) {
    throw result.error;
  }
  if (defaultedOptions.notifyOnChangeProps === "tracked") {
    result = observer.trackResult(result, defaultedOptions);
  }
  return result;
}
function useQuery(arg1, arg2, arg3) {
  var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  return useBaseQuery(parsedOptions, QueryObserver);
}
const StyledTextArea = /* @__PURE__ */ createStyled("textarea", {
  target: "e8tae9m0"
})({
  name: "51gjk0",
  styles: "width:19rem;border:2px solid;border-radius:0.75rem;padding:0.2rem 0.75rem;height:3.6rem;font-size:14px"
});
function TextArea({
  name,
  placeholder
}, ref) {
  const [value, onChangeValue] = useInput("");
  return /* @__PURE__ */ jsx(StyledTextArea, { ref, name, value, onChange: onChangeValue, placeholder, autoComplete: "off" });
}
const TextArea$1 = reactExports.forwardRef(TextArea);
class TodoAPI {
  static getTodos() {
    return instance.get("/todos").then((response) => {
      var _a;
      return (_a = response.data) == null ? void 0 : _a.data;
    }).catch((error) => {
      throw new Error(`Getting todos failed: ${error}`);
    });
  }
  static createTodo(todoPayload) {
    return instance.post("/todos", todoPayload).then((response) => {
      var _a;
      return (_a = response.data) == null ? void 0 : _a.data;
    }).catch((error) => {
      throw new Error(`Creating todos failed: ${error}`);
    });
  }
  static updateTodo({
    id,
    todoPayload
  }) {
    return instance.put(`/todos/${id}`, todoPayload).then((response) => {
      var _a;
      return (_a = response.data) == null ? void 0 : _a.data;
    }).catch((error) => {
      throw new Error(`Updating todos failed: ${error}`);
    });
  }
  static deleteTodo(id) {
    return instance.delete(`/todos/${id}`).then((response) => {
      var _a;
      return (_a = response.data) == null ? void 0 : _a.data;
    }).catch((error) => {
      throw new Error(`Deleting todos failed: ${error}`);
    });
  }
}
const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(TodoAPI.deleteTodo, {
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
  return mutation;
};
const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(TodoAPI.updateTodo, {
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
  return mutation;
};
const Wrapper = /* @__PURE__ */ createStyled("div", {
  target: "ep0es836"
})({
  name: "1eoy87d",
  styles: "display:flex;justify-content:space-between"
});
const StyledButton = /* @__PURE__ */ createStyled("button", {
  target: "ep0es835"
})({
  name: "1o23sjc",
  styles: "border:2px solid gray;border-radius:0.5rem;height:1.6rem"
});
const UpdateButton = /* @__PURE__ */ createStyled(StyledButton, {
  target: "ep0es834"
})({
  name: "1ai8bui",
  styles: ":hover{background-color:#86efac;}"
});
const DeleteButton = /* @__PURE__ */ createStyled(StyledButton, {
  target: "ep0es833"
})({
  name: "xsmy7q",
  styles: ":hover{background-color:#fca5a5;}"
});
const UpdateInput = /* @__PURE__ */ createStyled(StyledButton.withComponent("input", {
  target: "ep0es837"
}), {
  target: "ep0es832"
})({
  name: "ezbc4w",
  styles: "width:15rem;height:1.2rem"
});
const Title = /* @__PURE__ */ createStyled(UpdateInput.withComponent("p", {
  target: "ep0es838"
}), {
  target: "ep0es831"
})({
  name: "1rfwmzu",
  styles: "font-weight:bold;margin-bottom:0.5rem;border:0"
});
const Content = /* @__PURE__ */ createStyled("pre", {
  target: "ep0es830"
})({
  name: "n5o1pk",
  styles: "border:0;overflow:hidden;text-overflow:ellipsis;width:15rem;white-space:pre-wrap;word-wrap:break-word;max-height:3.6rem"
});
function Todo({
  id,
  title,
  content
}) {
  const [modifyToggle, setModifyToggle] = reactExports.useState(false);
  const titleInputRef = reactExports.useRef(null);
  const contentInputRef = reactExports.useRef(null);
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const onClickUpdate = reactExports.useCallback(() => {
    setModifyToggle((prev) => !prev);
    if (!modifyToggle || !titleInputRef.current || !contentInputRef.current) {
      return;
    }
    const todoPayload = {
      title: titleInputRef.current.value,
      content: contentInputRef.current.value
    };
    updateMutation.mutate({
      id,
      todoPayload
    });
  }, [modifyToggle]);
  const onClickDelete = reactExports.useCallback(() => {
    deleteMutation.mutate(id);
  }, []);
  return /* @__PURE__ */ jsxs(Wrapper, { children: [
    modifyToggle ? /* @__PURE__ */ jsxs("form", { children: [
      /* @__PURE__ */ jsx(UpdateInput, { ref: titleInputRef, name: "title", type: "text", defaultValue: title }),
      /* @__PURE__ */ jsx(UpdateInput, { ref: contentInputRef, name: "content", type: "text", defaultValue: content })
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title, { children: title }),
      /* @__PURE__ */ jsx(Content, { children: content })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(UpdateButton, { type: "button", onClick: onClickUpdate, children: modifyToggle ? "✅" : "⚙️" }),
      /* @__PURE__ */ jsx(DeleteButton, { type: "button", onClick: onClickDelete, children: "🗑️" })
    ] })
  ] });
}
const Todo$1 = reactExports.memo(Todo);
const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(TodoAPI.createTodo, {
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
  return mutation;
};
const useGetTodos = () => {
  const query = useQuery(["todos"], TodoAPI.getTodos, {
    suspense: true
  });
  return query;
};
const TodoBox = /* @__PURE__ */ createStyled("div", {
  target: "e1m7j2zw2"
})({
  name: "130xtx7",
  styles: "border:2px solid;border-radius:0.75rem;padding:1.25rem;width:18rem"
});
const TodoContainer = /* @__PURE__ */ createStyled("div", {
  target: "e1m7j2zw1"
})({
  name: "154rxsx",
  styles: "display:grid;gap:1.25rem"
});
const TodoForm = /* @__PURE__ */ createStyled("form", {
  target: "e1m7j2zw0"
})({
  name: "p2oy12",
  styles: "display:flex;flex-direction:column;gap:0.25rem"
});
function TodoPage() {
  const todoInputRef = reactExports.useRef(null);
  const contentInputRef = reactExports.useRef(null);
  const {
    isLoading,
    data
  } = useGetTodos();
  const createMutation = useCreateTodo();
  const onSubmitTodo = reactExports.useCallback((e) => {
    e.preventDefault();
    if (!todoInputRef.current || !contentInputRef.current)
      return;
    createMutation.mutate({
      title: todoInputRef.current.value,
      content: contentInputRef.current.value
    });
    if (createMutation.isSuccess) {
      todoInputRef.current.value = "";
      contentInputRef.current.value = "";
    }
  }, []);
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(TodoContainer, { children: [
    /* @__PURE__ */ jsx("h3", { children: "할 일 쓰기" }),
    /* @__PURE__ */ jsxs(TodoForm, { onSubmit: onSubmitTodo, children: [
      /* @__PURE__ */ jsx(Input, { ref: todoInputRef, name: "title", type: "text", placeholder: "제목" }),
      /* @__PURE__ */ jsx(TextArea$1, { ref: contentInputRef, name: "content", placeholder: "내용" }),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "글 쓰기" })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "할 일 목록" }),
    /* @__PURE__ */ jsx(TodoBox, { children: isLoading ? /* @__PURE__ */ jsx("p", { children: "로딩중..." }) : data.map((todoInfo) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Todo$1, { ...todoInfo }),
      /* @__PURE__ */ jsx("hr", {})
    ] }, todoInfo.id)).reverse() })
  ] }) });
}
export {
  TodoPage as default
};
