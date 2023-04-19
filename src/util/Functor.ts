

export function map<_Tp, _ResTp>( item : _Tp, mapping : (item : _Tp) => _ResTp ) : _ResTp {
    return mapping(item);
}